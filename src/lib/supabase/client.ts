import { createBrowserClient } from "@supabase/ssr";

/**
 * Client-side Supabase client for React components.
 * Automatically detects whether live Supabase credentials are configured;
 * if using placeholder credentials during local offline testing, provides a robust
 * mock auth client for testing FR-1, FR-2, FR-3, and FR-55 flows.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isLiveConfigured =
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl?.includes("placeholder") &&
    !supabaseUrl?.includes("your-project");

  if (isLiveConfigured) {
    return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
  }

  // A production build without the Supabase variables cannot work. NEXT_PUBLIC_* values are fixed into the
  // browser code at build time, so they must be set in Vercel BEFORE the build (then redeploy).
  // Fail with a readable message (shown by app/global-error.tsx) instead of a half-working mock.
  if (process.env.NODE_ENV === "production") {
    const missing = [
      !supabaseUrl || supabaseUrl.includes("placeholder") || supabaseUrl.includes("your-project") ? "NEXT_PUBLIC_SUPABASE_URL" : null,
      !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null,
    ].filter(Boolean);
    throw new Error(
      `CreatorLab setup: missing ${missing.join(" and ")}. Add ${missing.length > 1 ? "them" : "it"} in Vercel (Settings → Environment Variables), then redeploy.`
    );
  }

  // Local development only: offline mock client implementing the Supabase Auth calls the app uses
  return {
    auth: {
      onAuthStateChange() {
        return { data: { subscription: { unsubscribe() {} } } };
      },
      async signUp({ email, password, options }: any) {
        // Validation per FR-1
        if (!email || !password) {
          return { data: { user: null, session: null }, error: new Error("Email and password are required.") };
        }
        if (password.length < 8) {
          return { data: { user: null, session: null }, error: new Error("Password must be at least 8 characters long.") };
        }

        const mockUser = {
          id: "usr_" + Math.random().toString(36).substring(2, 10),
          email,
          user_metadata: options?.data || {},
          email_confirmed_at: null, // FR-2: Unverified account initially
          created_at: new Date().toISOString(),
        };

        // In local mock mode, persist to localStorage for verification tests
        if (typeof window !== "undefined") {
          const existing = JSON.parse(localStorage.getItem("creatorlab_users") || "[]");
          existing.push(mockUser);
          localStorage.setItem("creatorlab_users", JSON.stringify(existing));
        }

        // Returns user with no session (FR-2: triggers email confirmation screen)
        return {
          data: {
            user: mockUser,
            session: null,
          },
          error: null,
        };
      },

      async signInWithPassword({ email, password }: any) {
        if (typeof window !== "undefined") {
          const existing = JSON.parse(localStorage.getItem("creatorlab_users") || "[]");
          const found = existing.find((u: any) => u.email === email);

          if (!found) {
            return {
              data: { user: null, session: null },
              error: new Error("Invalid login credentials."),
            };
          }

          if (!found.email_confirmed_at) {
            // FR-2: Email not confirmed error
            return {
              data: { user: null, session: null },
              error: new Error("Email not confirmed. Please check your inbox."),
            };
          }

          const mockSession = {
            access_token: "mock-token-" + Date.now(),
            user: found,
          };
          localStorage.setItem("creatorlab_session", JSON.stringify(mockSession));
          return { data: { user: found, session: mockSession }, error: null };
        }

        return { data: { user: null, session: null }, error: new Error("Client window unavailable.") };
      },

      async signInWithOAuth({ provider }: any) {
        // FR-3: Google OAuth simulation
        if (typeof window !== "undefined") {
          const oauthUser = {
            id: `usr_${provider}_` + Date.now(),
            email: `creator.${provider}@creatorlab.africa`,
            user_metadata: {
              first_name: "African",
              last_name: "Creator",
              display_name: `African Creator (${provider})`,
              role: "user",
            },
            email_confirmed_at: new Date().toISOString(),
          };
          const mockSession = {
            access_token: "mock-oauth-token-" + Date.now(),
            user: oauthUser,
          };
          localStorage.setItem("creatorlab_session", JSON.stringify(mockSession));
          window.location.href = "/niches";
        }
        return { data: { provider, url: "/niches" }, error: null };
      },

      async signOut() {
        if (typeof window !== "undefined") {
          localStorage.removeItem("creatorlab_session");
        }
        return { error: null };
      },

      async getUser() {
        if (typeof window !== "undefined") {
          const session = JSON.parse(localStorage.getItem("creatorlab_session") || "null");
          return { data: { user: session?.user || null }, error: null };
        }
        return { data: { user: null }, error: null };
      },
    },
  } as any;
}

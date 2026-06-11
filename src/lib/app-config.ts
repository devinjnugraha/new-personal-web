/**
 * Centralized app config — single source of truth for all env vars.
 * Consumers call typed methods; parsing, defaults, and fallbacks live here.
 */

export const appConfig = {
    // Site
    getSiteUrl(): string {
        return process.env.NEXT_PUBLIC_SITE_URL ?? "https://devinjnugraha.vercel.app";
    },

    // API keys
    getOpenRouterApiKey(): string {
        return process.env.OPENROUTER_API_KEY ?? "";
    },

    // Database
    getDatabaseUrl(): string {
        return process.env.DATABASE_URL ?? "";
    },

    // Chat
    getChatModel(): string {
        return process.env.CHAT_MODEL ?? "anthropic/claude-haiku-4-5";
    },

    getChatMaxOutputTokens(): number {
        return parseInt(process.env.CHAT_MAX_OUTPUT_TOKENS ?? "1000", 10);
    },

    getChatTemperature(): number {
        return parseFloat(process.env.CHAT_TEMPERATURE ?? "0.7618");
    },

    getChatRateLimit(): number {
        return parseInt(process.env.CHAT_RATE_LIMIT ?? "20", 10);
    },

    /** Rate limit window in milliseconds (env var is in seconds). */
    getChatRateWindowMs(): number {
        return parseInt(process.env.CHAT_RATE_WINDOW ?? "3600", 10) * 1000;
    },
} as const;

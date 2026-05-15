// src/auth/auth.ts

export interface AuthContext {
	readonly url: URL;
	readonly method: string;
	readonly headers: Headers;
}

export interface AuthStrategy {
	readonly name: string;
	apply(context: AuthContext): void | Promise<void>;
}

export class NoAuthStrategy implements AuthStrategy {
	public readonly name = "none";
	public apply(): void {}
}

export class BasicAuthStrategy implements AuthStrategy {
	public readonly name: string = "basic";
	public constructor(
		private readonly username: string,
		private readonly password: string,
	) {}
	public apply(context: AuthContext): void {
		context.headers.set("Authorization", `Basic ${btoa(`${this.username}:${this.password}`)}`);
	}
}

export class ApplicationPasswordAuthStrategy extends BasicAuthStrategy {
	public override readonly name = "application-password";
}

export class BearerTokenAuthStrategy implements AuthStrategy {
	public readonly name = "bearer";
	public constructor(private readonly token: string) {}
	public apply(context: AuthContext): void {
		context.headers.set("Authorization", `Bearer ${this.token}`);
	}
}

export class NonceAuthStrategy implements AuthStrategy {
	public readonly name = "nonce";
	public constructor(private readonly nonce: string) {}
	public apply(context: AuthContext): void {
		context.headers.set("X-WP-Nonce", this.nonce);
	}
}

export type AuthConfig =
	| { readonly type?: "none" }
	| { readonly type: "application-password"; readonly username: string; readonly applicationPassword: string }
	| { readonly type: "basic"; readonly username: string; readonly password: string }
	| { readonly type: "bearer"; readonly token: string }
	| { readonly type: "nonce"; readonly nonce: string }
	| { readonly type: "custom"; readonly strategy: AuthStrategy };

export function createAuthStrategy(config?: AuthConfig): AuthStrategy {
	if (!config || config.type === undefined || config.type === "none") return new NoAuthStrategy();
	switch (config.type) {
		case "application-password":
			return new ApplicationPasswordAuthStrategy(config.username, config.applicationPassword);
		case "basic":
			return new BasicAuthStrategy(config.username, config.password);
		case "bearer":
			return new BearerTokenAuthStrategy(config.token);
		case "nonce":
			return new NonceAuthStrategy(config.nonce);
		case "custom":
			return config.strategy;
	}
}

import { AnyTypeDefinition, CompileType, TypeDefinition, TypeName } from "../Core/T";
import { AnyComponent, ComponentBundle, Query } from "../Types";

type Or<T, U> = T extends undefined ? U : T;

export type ReactorQuery<
	All extends ComponentBundle,
	Updated extends ComponentBundle,
	Any extends ComponentBundle,
	With extends ComponentBundle,
> = {
	withAll: [...All];
	withUpdated: [...Updated];
	withAny: [...Any];
	without: [...With];
};

type InferComponents<A extends ComponentBundle> = A extends []
	? A
	: A extends [infer F, ...infer R]
	? F extends AnyComponent
		? R extends ComponentBundle
			? [CompileType<F["type"]>, ...InferComponents<R>]
			: never
		: never
	: never;

export class Reactor<a extends ReactorQuery<ComponentBundle, ComponentBundle, ComponentBundle, ComponentBundle>> {
	// todo registry class
	public constructor(registry: void, query: Query);

	public each(
		f: (
			entity: number,
			...components: InferComponents<[...a["withAll"], ...a["withUpdated"], ...a["withAny"]]>
		) => void,
	): void;

	public consume(entity: number): void;

	public consumeEach(
		f: (
			entity: number,
			...components: InferComponents<[...a["withAll"], ...a["withUpdated"], ...a["withAny"]]>
		) => void,
	): void;

	public withAttachments(
		f: (
			entity: number,
			...components: InferComponents<[...a["withAll"], ...a["withUpdated"], ...a["withAny"]]>
		) => Array<RBXScriptConnection | Instance | Callback>,
	): void;
}

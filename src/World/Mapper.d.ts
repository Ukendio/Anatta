import { t } from "@rbxts/t";
import { AnyTypeDefinition, CompileType, TypeDefinition, TypeName } from "../Core/T";
import { AnyComponent, ComponentBundle, Query } from "../Types";

type Or<T, U> = T extends undefined ? U : T;

export type MapperQuery<All extends ComponentBundle, Any extends ComponentBundle, With extends ComponentBundle> = {
	withAll: [...All];
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

export class Mapper<a extends MapperQuery<ComponentBundle, ComponentBundle, ComponentBundle>> {
	// todo registry class
	public constructor(registry: void, query: Query);

	public map<Q extends InferComponents<[...Or<a["withAll"], []>, ...Or<a["withAny"], []>]>>(
		f: (entity: number, ...components: Q) => LuaTuple<InferComponents<[...a["withAll"]]>>,
	): void;

	public each(f: (entity: number, ...components: InferComponents<[...a["withAll"], ...a["withAny"]]>) => void): void;
}

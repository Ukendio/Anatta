import { CompileType, TypeDefinition } from "../Core/T";
import { AnyComponent } from "../Types";

type MapAttributes<a extends AnyComponent, C> = C extends Array<{ [index: string]: unknown }>
	? {
			[index in `${a["name"]}${1}_this`]: number;
	  }
	: never;

type InferDeepestValue<T> = T extends Array<infer R> | { [index: string]: infer R } ? InferDeepestValue<R> : T;

declare function tryToAttributes<a extends AnyComponent, C extends CompileType<a["type"]>>(
	instance: Instance,
	entity: number,
	definition: a,
	component: C,
): LuaTuple<[false, string] | [true, Map<string, InferDeepestValue<C>>, MapAttributes<a, C>]>;

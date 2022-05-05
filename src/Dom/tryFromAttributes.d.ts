import T, { CompileType } from "../Core/T";
import { AnyComponent } from "../Types";

declare function tryFromAttributes<T extends AnyComponent>(
	instance: Instance,
	componentDefinition: T,
): LuaTuple<[false, string] | [true, number, CompileType<T["type"]>]>;

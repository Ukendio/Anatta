import { AnyComponent } from "./Types";
import { World } from "./World";

/**
 * Creates a new World. If the second argument is a list of
 * [`ComponentDefinition`](#ComponentDefinition)s, calls
 * [`Registry:defineComponent`](/api/Registry#defineComponent) on each member of the
 * list. Otherwise, if the second argument is an `Instance`, calls `require` on all of
 * the `Instance`'s `ModuleScript` descendants and attempts to define each result.
 *
 * @function createWorld
 * @param namespace - string
 * @param componentDefinitions - Array<ComponentDefinitions>
 * @returns World
 */
declare function createWorld<T extends Array<{ name: N; type: unknown }>, N extends string>(
	namespace: string,
	componentDefinitions: T,
): World<T, N>;

/**
 * Returns the World {@link https://kennethloeffler.github.io/anatta/api/World} with the given namespace.
 *
 * @function createWorld
 * @param namespace string
 * @return @see World
 */
declare function getWorld<T extends Array<{ name: N; type: unknown }>, N extends string>(
	namespace: string,
	script?: LuaSourceContainer,
): World<T, N>;

export { createWorld, getWorld };

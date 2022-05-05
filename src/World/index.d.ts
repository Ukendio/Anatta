import { ComponentBundle } from "../Types";
import { Mapper, MapperQuery } from "./Mapper";
import { Reactor, ReactorQuery } from "./Reactor";

export type Entity<T extends ComponentBundle> = number & {
	/**
	 * @hidden
	 * @deprecated
	 */
	readonly _nominal_entity: T;
};

export type AnyEntity = Entity<ComponentBundle>;

type CompileComponents<T extends Array<{ name: string; type: unknown }>> = {
	[k in T[number]["name"]]: { name: k; type: Extract<T[number], { name: k }>["type"] };
};

/**
 * @class World
 * A `World` contains a [`Registry`](/api/Registry) and provides means for both scoped and
 * unscoped access to entities and components.
 *
 * You can get or create a `World` with [`Anatta.getWorld`](/api/Anatta#getWorld) and
 * [`Anatta.createWorld`](/api/Anatta#createWorld).
 */

export class World<T extends Array<{ name: N; type: unknown }>, N extends string> {
	/**
	 * Creates a new `World` containing an empty [`Registry`](/api/Registry) and calls
	 * [`Registry:defineComponent`](/api/Registry#defineComponent) for each
	 * [`ComponentDefinition`](/api/Anatta#ComponentDefinition) in the given list.
	 *
	 * @private constructor
	 * @param definitions Array<ComponentDefinition>
	 * @return World
	 */
	private constructor(definitions: T);

	readonly components: CompileComponents<T>;

	public fromPrefab(prefab: Model): LuaTuple<[AnyEntity, Array<Instances>]>;

	public cloneFromPrefab(prefab: Model): LuaTuple<[Model, AnyEntity, Array<Instances>]>;

	/**
	 * Creates a new [`Mapper`](/api/Mapper) given a [`Query`](#Query).
	 *
	 * @error "mappers cannot track updates to components; use a Reactor instead" -- Reactors can track updates. Mappers can't.
	 * @error "mappers need at least one component type provided in withAll" -- Mappers need components in withAll to query.
	 * @error 'the component type "%s" is not defined for this world" -- No component matches that definition.
	 *
	 * @param query Query
	 * @return Mapper
	 */
	public getMapper<
		All extends ComponentBundle,
		Any extends ComponentBundle,
		With extends ComponentBundle,
		a extends MapperQuery<All, Any, With>,
	>(query: a): Mapper<a>;

	public getReactor<
		All extends ComponentBundle,
		Updated extends ComponentBundle,
		Any extends ComponentBundle,
		With extends ComponentBundle,
		a extends ReactorQuery<All, Updated, Any, With>,
	>(query: a): Reactor<a>;

	public addSystem(script: LuaSourceContainer): void;

	public removeSystem(script: LuaSourceContainer): void;
}

import { AnyEntity } from ".";
import { AnyComponent, ComponentDefinition } from "../Types";

export class Registry {
	static getId(entity: AnyEntity): number;

	static getVersion(entity: AnyEntity): number;

	static getDomain(entity: AnyEntity): number;

	static fromRegistry(original: Registry): Registry;

	public defineComponent<T extends AnyComponent>(definition: T): T;

	public createEntity(): AnyEntity;

	public importEntity<E extends AnyEntity>(entity: E): E;

	public createEntityFrom<E extends AnyEntity>(entity: E): E;

	public destroyEntity(entity: AnyEntity): void;

	public entityIsValid<E extends AnyEntity>(entity: E): [boolean, string, E];

	public entityIsOrphaned(entity: AnyEntity): boolean;

	public visitComponents(cb: (definition: AnyComponent) => boolean, entity?: AnyEntity): boolean;

	public entityHas(entity: AnyEntity, ...definitions: Array<AnyComponent>): boolean;

	public entityHasAny(entity: AnyEntity, ...definitions: Array<AnyComponent>): boolean;

	//todo compute returnType of T

	public getComponent<a extends AnyComponent>(entity: AnyEntity, definition: a): a["type"];
}

import { AnyTypeDefinition, TypeDefinition } from "../Core/T";

declare function waitForRefs<T extends Array<ObjectValue>>(
	instance: Instance,
	attributeName: string,
	typeDefinition: AnyTypeDefinition,
	objectValues: Array<ObjectValue>,
	refFolder: Folder,
): T;

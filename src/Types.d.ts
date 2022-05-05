import { AnyTypeDefinition, TypeDefinition, TypeName } from "./Core/T";

export type ComponentBundle = ReadonlyArray<AnyComponent>;

export type AnyComponent = {
	name: string;
	type: AnyTypeDefinition;
};

export interface Query {
	withAll?: Array<AnyComponent>;
	withUpdated?: Array<AnyComponent>;
	withAny?: Array<AnyComponent>;
	without?: Array<AnyComponent>;
}

import { t } from "@rbxts/t";

export type AnyTypeDefinition = TypeDefinition<keyof t, unknown, Array<AnyTypeDefinition>>;
type TypeDefinitionBundle = Array<AnyTypeDefinition>;

type makeConcreteInstance<T extends AnyTypeDefinition> = (typeDefinition: T) => [true, T["typeName"]];

type GetConcreteTypes<T extends TypeDefinitionBundle> = T extends []
	? T
	: T extends [infer F, ...infer B]
	? F extends AnyTypeDefinition
		? B extends TypeDefinitionBundle
			? [ReturnType<F["tryGetConcreteType"]>, ...GetConcreteTypes<B>]
			: never
		: never
	: never;

interface concreters {
	Instance: makeConcreteInstance<AnyTypeDefinition>;
	instance: makeConcreteInstance<AnyTypeDefinition>;
	instanceOf: makeConcreteInstance<AnyTypeDefinition>;
	instanceIsA: makeConcreteInstance<AnyTypeDefinition>;

	literal: () => [true, "literal"];
	array: () => [true, Array<unknown>];

	strictArray: <a extends AnyTypeDefinition>(
		typeDefinition: a,
	) => [true, GetConcreteTypes<a["typeParams"]>] | [false, keyof concreters];

	strictInterface: <T extends { [index: string]: AnyTypeDefinition }>(
		typeDefinition: T,
	) => TypeDefinition<"strictInterface", unknown, never>; // TODO: should not return void
}

export interface defaults {
	Instance: () => LuaTuple<[true, Folder]>;

	instanceOf: (typeDefinition: AnyTypeDefinition) => [boolean, Instance];

	instanceIsA: (typeDefinition: AnyTypeDefinition) => [boolean, Instance];

	literal: <a extends AnyTypeDefinition>(TypeDefinition: a) => [true, a["typeParams"][0]["typeParams"][0]];

	number: 0;
	string: "";
	boolean: false;
	BrickColor: BrickColor;
	CFrame: CFrame;
	Color3: Color3;
	ColorSequence: ColorSequence;

	NumberRange: NumberRange;
	NumberSequence: NumberSequence;
	Rect: Rect;
	TweenInfo: TweenInfo;
	UDim: UDim;
	UDim2: UDim2;
	Vector2: Vector2;
	Vector3: Vector3;
}

export type TypeName = keyof defaults | keyof concreters;

export interface TypeDefinition<T extends string, Type, TypeParams extends Array<unknown>> {
	typeName: T;
	typeParams: TypeParams;

	tryDefault<C extends ReturnType<this["tryGetConcreteType"]>>(): LuaTuple<
		C[0] extends true ? [true, C[1]] : [false, C[1]]
	>;

	tryGetConcreteType(): LuaTuple<T extends keyof defaults ? [true, ReturnType<defaults[T]>] : [false, string]>;

	GetEnumItems(): TypeParams;
}

interface T {}

type WrapT<C> = C extends t.check<infer R>
	? AnyTypeDefinition
	: C extends Record<string, t.check<infer R>>
	? { [index: string]: AnyTypeDefinition }
	: never;

declare const T: T & {
	[K in keyof t]: K extends firstOrder
		? TypeDefinition<K, t.static<t[K]>, never>
		: K extends secondOrder
		? <Params extends Parameters<t[K]>[0], C extends WrapT<Params>>(check: C) => TypeDefinition<K, C, []>
		: /* &
				(<C extends K extends "union" ? Array<AnyTypeDefinition> : never>(
					...check: C
				) => TypeDefinition<K, C[number], []>) 
				*/
		  never;
};

export type CompileType<T extends AnyTypeDefinition> = T["typeName"] extends firstOrder
	? t.static<t[T["typeName"]]>
	: T["typeName"] extends secondOrder
	? T extends TypeDefinition<T["typeName"], infer R, []>
		? T["typeName"] extends "strictInterface"
			? Strict<R>
			: T["typeName"] extends "strictArray"
			? R extends AnyTypeDefinition
				? Array<t.static<t[R["typeName"]]>>
				: never
			: never
		: never
	: never;

type testStrictInterface = CompileType<
	TypeDefinition<
		"strictInterface",
		{
			foo: TypeDefinition<"CFrame", CFrame, never>;
		},
		[]
	>
>;

type testStrictArray = CompileType<TypeDefinition<"strictArray", typeof T.CFrame, []>>;

type Strict<T> = T extends { [index: string]: TypeDefinition<string, infer R, never> } ? { [K in keyof T]: R } : never;

export default T;

type firstOrder =
	| "DockWidgetPluginGuiInfo"
	| "string"
	| "numberPositive"
	| "CFrame"
	| "UDim2"
	| "table"
	| "TweenInfo"
	| "UDim"
	| "Vector3int16"
	| "NumberSequence"
	| "numberNegative"
	| "Color3"
	| "Region3int16"
	| "Enum"
	| "Faces"
	| "none"
	| "number"
	| "Region3"
	| "integer"
	| "ColorSequence"
	| "callback"
	| "Random"
	| "NumberRange"
	| "PhysicalProperties"
	| "EnumItem"
	| "Instance"
	| "nan"
	| "Vector3"
	| "Rect"
	| "Ray"
	| "NumberSequenceKeypoint"
	| "BrickColor"
	| "Vector2"
	| "PathWaypoint"
	| "Axes"
	| "boolean"
	| "ColorSequenceKeypoint";

type secondOrder =
	| "values"
	| "integer"
	| "keyOf"
	| "numberMaxExclusive"
	| "match"
	| "numberMinExclusive"
	| "strictArray"
	| "every"
	| "keys"
	| "strict"
	| "enum"
	| "interface"
	| "map"
	| "instanceIsA"
	| "instanceOf"
	| "literal"
	| "strictInterface"
	| "wrap"
	| "intersection"
	| "numberMin"
	| "union"
	| "numberConstrained"
	| "set"
	| "valueOf"
	| "numberMax"
	| "array"
	| "numberConstrainedExclusive"
	| "some";

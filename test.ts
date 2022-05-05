import { createWorld } from "./src";
import T from "./src/Core/T";

const world = createWorld("hello", [
	{
		name: "humanoid",
		type: T.string,
	},
	{
		name: "transform",
		type: T.CFrame,
	},
	{
		name: "colour",
		type: T.Color3,
	},
	{
		name: "brickColour",
		type: T.BrickColor,
	},
	{
		name: "struct",
		type: T.strictInterface({
			foo: T.CFrame,
		}),
	},
	{
		name: "array",
		type: T.strictArray(T.CFrame),
	},
]);

const components = world.components;

const system = world.getReactor({
	withAll: [components.struct, components.array],
	// unfortunately we have to make these required fields because holes in tuples makes MapperQuery all wrong...
	withUpdated: [],
	withAny: [components.colour, components.brickColour],
	without: [],
});

system.each((_, struct, arr, colour3, brickColour) => {
	struct.foo; // CFrame
	arr[0]; // CFrame
	colour3.R; // Color3
	brickColour.Color; // BrickColour
});

system;

function $multi<T extends Array<unknown>>(...variadic: T): LuaTuple<T> {
	return variadic as LuaTuple<T>;
}

system.each((_, struct, arr) => {
	return $multi(struct, arr);
});

system.withAttachments((e, component) => {
	return [new Instance("Part")];
});

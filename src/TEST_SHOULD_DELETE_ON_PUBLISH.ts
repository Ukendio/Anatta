import { createWorld } from ".";
import T from "./Core/T";
import tryFromAttributes from "./Dom/tryFromAttributes";
import { tryToAttributes } from "./Dom/tryToAttributes";

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

	{
		name: "test",
		type: T.array(
			T.strictInterface({
				a: T.number,
			}),
		),
	},
]);

const components = world.components;

const system = world.getReactor({
	withAll: [components.struct, components.array],
	// unfortunately we have to make these required fields because holes in tuples makes MapperQuery all wrong...
	withUpdated: [components.test],
	withAny: [components.colour, components.brickColour],
	without: [],
});

system.each((_, struct, arr, test, colour3, brickColour) => {
	struct; // { foo: CFrame }
	arr; // Array<CFrame>
	test; // Array<{ a: number }>
	colour3.R; // Color3
	brickColour.Color; // BrickColour
});

const instance = new Instance("Folder");

const [success, attributeMap] = tryToAttributes(instance, 0, components.test, [{ a: 1 }, { a: 2 }, { a: 3 }]);

const [ok, entity, component] = tryFromAttributes(instance, {
	name: "vec3",
	type: T.Vector3,
});

if (ok && success) {
	entity; // number
	component; // Vector3

	const a = attributeMap.get("Test_1_this"); // number | undefined
}

function $multi<T extends Array<unknown>>(...variadic: T): LuaTuple<T> {
	return variadic as LuaTuple<T>;
}

system.each((_, struct, arr) => {
	return $multi(struct, arr);
});

system.withAttachments((e, component) => {
	return [new Instance("Part")];
});

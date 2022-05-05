import { Pool } from "../Core/Pool";
import { AnyComponent } from "../Types";

declare function tryFromTagged<T extends Pool>(pool: T, ancestorsToIgnore: Array<Instance>): LuaTuple<[true, T]>;

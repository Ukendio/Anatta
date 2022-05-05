declare const Constants: {
	Debug: true;

	DomainOffset: 0;
	DomainWidth: 1;

	Domain: 0 | 1;

	PartialIdOffset: 1;
	PartialIdWidth: number;

	EntityIdOffset: 0;
	EntityIdWidth: number;
	EntityIdMask: 0x00ffffff;

	VersionOffset: number;
	VersionWidth: number;

	NullEntityId: 0;

	EntityTagName: ".anattaSharedInstance";
	EntityAttributeName: "__entity";
	InstanceRefFolder: "__anattaRefs";
};

export = Constants;

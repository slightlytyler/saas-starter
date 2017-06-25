class Model {
	constructor(connector) {
		const { modelName, schema } = this.constructor;
		this.modelName = modelName;
		this.schema = schema;
		this.connector = connector;
		this.findList = connector.findList.bind(connector, modelName);
		this.findObject = connector.findObject.bind(connector, modelName);
		this.createObject = connector.createObject.bind(connector, modelName);
		this.deleteObject = connector.deleteObject.bind(connector, modelName);
		this.updateObject = connector.updateObject.bind(connector, modelName);
	}

	static removeDefaultMethods() {
		delete this.findList;
		delete this.findObject;
		delete this.createObject;
		delete this.deleteObject;
		delete this.updateObject;
	}
}

export default Model;

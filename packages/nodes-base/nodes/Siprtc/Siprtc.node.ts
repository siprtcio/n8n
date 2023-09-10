import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { playFields, playOperations } from './PlayDescription';
var { XMLBuilder, XMLParser } from 'fast-xml-parser';
var { decode } from 'html-entities';


export class Siprtc implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Siprtc',
		name: 'siprtc',
		icon: 'file:siprtc.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'play a sound file on calls',
		defaults: {
			name: 'Siprtc',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Play',
						value: 'play',
					},
				],
				default: 'play',
				required: true,
			},
			...playOperations,
			...playFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		const l_mediaUrl = this.getNodeParameter('sourndfile', 0);


		for (let i = 0; i < items.length; i++) {
			let responseData;
			if (resource === 'play') {
				if (operation === 'play') {
					let obj = {};
					let playobj = { Play: {} };
					let mediaUrl = decode(l_mediaUrl);

					if (mediaUrl.length > 0) {
							playobj.Play = [
								{ '#text': l_mediaUrl }
							];
					}

						obj = {
							"?xml": {
								"$version": "1.0",
								"$encoding": "UTF-8"
							},
							Response: {
								Play: playobj.Play
							}
						};

					const options = {
						ignoreAttributes: false,
						attributeNamePrefix: "$",
						format: true,
						suppressEmptyNode: true
					};

					const builder = new XMLBuilder(options);
					const xmlContent = builder.build(obj);
					responseData = xmlContent;
				}
			} else if (resource === 'say') {
				responseData = `<Response><Say>Hello, this is a static TwiML response.</Say></Response>`;
			} else if (resource === 'gather') {

			}

			Array.isArray(responseData)
				? returnData.push(...(responseData as IDataObject[]))
				: returnData.push(responseData as unknown as IDataObject);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

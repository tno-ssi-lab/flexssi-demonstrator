Esatus: wisselen ledger: https://indy-ledger.ssi-lab.nl/
  auZFsiZN

Trinsic: werkt ook goed, ledger is: Sovrin staging


Register App
Registration Response
{
  "id": 23,
  "name": "ssi_proto",
  "uuid": "33bdc59a-1759-41f0-9cc5-6af5c9fc49ad",
  "sharedSecret": "505d9c058e0811b522b0d780a7cd50cbe6a29719ab981c02451eda1dcdc75ebb"
}

{
  "name": "SsiTest",
  "version": "0.0.1",
  "attributes": [
    "firstName",
    "lastName"
  ],
  "indySchemaId": "H62LhHqVio17b8QU3r84cW:2:SsiTest:0.0.1",
  "indyCredentialDefinitionId": "H62LhHqVio17b8QU3r84cW:3:CL:225:default",
  "id": 11
}

{
  "type": "SsiTest",
  "irmaType": null,
  "organization": {
    "id": 23,
    "name": "ssi_proto",
    "uuid": "33bdc59a-1759-41f0-9cc5-6af5c9fc49ad"
  },
  "jolocomType": null,
  "idaType": null,
  "indySchema": {
    "id": 11,
    "name": "SsiTest",
    "version": "0.0.1",
    "attributes": [
      "firstName",
      "lastName"
    ],
    "indySchemaId": "H62LhHqVio17b8QU3r84cW:2:SsiTest:0.0.1",
    "indyCredentialDefinitionId": "H62LhHqVio17b8QU3r84cW:3:CL:225:default"
  },
  "trinsicSchema": null,
  "id": 65
}

# Skills

__credential__
{
  "type": "flexssi_skills_v2",
  "irmaType": null,
  "organization": {
    "id": 23,
    "name": "ssi_proto",
    "uuid": "33bdc59a-1759-41f0-9cc5-6af5c9fc49ad"
  },
  "jolocomType": {
    "id": 23,
    "type": "flexssi_skills_v1",
    "name": "Flex SSI skills",
    "context": [
      {}
    ],
    "claimInterface": {
      "Vorkheftruck A": false,
      "Vorkheftruck B": false
    }
  },
  "idaType": null,
  "indySchema": {
    "id": 14,
    "name": "flexssi_skills_v1",
    "version": "0.0.1",
    "attributes": [
      "Vorkheftruck A",
      "Vorkheftruck B"
    ],
    "indySchemaId": "H62LhHqVio17b8QU3r84cW:2:flexssi_skills_v1:0.0.1",
    "indyCredentialDefinitionId": "H62LhHqVio17b8QU3r84cW:3:CL:249:default"
  },
  "trinsicSchema": {
    "id": 10,
    "name": "flexssi_skills_v1",
    "version": "0.0.1",
    "attributeNames": [
      "Vorkheftruck A",
      "Vorkheftruck B"
    ],
    "supportRevocation": null,
    "trinsicSchemaId": "4Pa4vM6mFr12dwAxNEZa7c:2:flexssi_skills_v1:0.0.1",
    "trinsicCredentialDefinitionId": "4Pa4vM6mFr12dwAxNEZa7c:3:CL:281059:default",
    "tag": null
  },
  "id": 86
}

__Indy__
{
  "name": "flexssi_skills_v1",
  "version": "0.0.1",
  "attributes": [
    "Vorkheftruck A",
    "Vorkheftruck B"
  ],
  "indySchemaId": "H62LhHqVio17b8QU3r84cW:2:flexssi_skills_v1:0.0.1",
  "indyCredentialDefinitionId": "H62LhHqVio17b8QU3r84cW:3:CL:249:default",
  "id": 14
}

__Jolocom__
{
  "type": "flexssi_skills_v1",
  "name": "Flex SSI skills",
  "claimInterface": {
    "Vorkheftruck A": false,
    "Vorkheftruck B": false
  },
  "context": [
    {}
  ],
  "id": 23
}

__Trinsic__
{
  "name": "flexssi_skills_v1",
  "version": "0.0.1",
  "attributeNames": [
    "Vorkheftruck A",
    "Vorkheftruck B"
  ],
  "trinsicSchemaId": "4Pa4vM6mFr12dwAxNEZa7c:2:flexssi_skills_v1:0.0.1",
  "trinsicCredentialDefinitionId": "4Pa4vM6mFr12dwAxNEZa7c:3:CL:281059:default",
  "supportRevocation": null,
  "tag": null,
  "id": 10
}
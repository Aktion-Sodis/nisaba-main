export const schema = {
    "models": {
        "Organization": {
            "name": "Organization",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "nameCamelCase": {
                    "name": "nameCamelCase",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "nameKebabCase": {
                    "name": "nameKebabCase",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "nameVerbose": {
                    "name": "nameVerbose",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Organizations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "bio": {
                    "name": "bio",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "permissions": {
                    "name": "permissions",
                    "isArray": true,
                    "type": {
                        "nonModel": "Permission"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Config": {
            "name": "Config",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "colorTheme": {
                    "name": "colorTheme",
                    "isArray": false,
                    "type": {
                        "nonModel": "ColorTheme"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Configs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Level": {
            "name": "Level",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "parentLevelID": {
                    "name": "parentLevelID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "interventionsAreAllowed": {
                    "name": "interventionsAreAllowed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "allowedInterventions": {
                    "name": "allowedInterventions",
                    "isArray": true,
                    "type": {
                        "model": "LevelInterventionRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "level"
                        ]
                    }
                },
                "customData": {
                    "name": "customData",
                    "isArray": true,
                    "type": {
                        "nonModel": "CustomData"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Levels",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Intervention": {
            "name": "Intervention",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "interventionType": {
                    "name": "interventionType",
                    "isArray": false,
                    "type": {
                        "enum": "InterventionType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "contents": {
                    "name": "contents",
                    "isArray": true,
                    "type": {
                        "model": "InterventionContentRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "intervention"
                        ]
                    }
                },
                "surveys": {
                    "name": "surveys",
                    "isArray": true,
                    "type": {
                        "model": "Survey"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "interventionSurveysId"
                        ]
                    }
                },
                "tags": {
                    "name": "tags",
                    "isArray": true,
                    "type": {
                        "model": "InterventionInterventionTagRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "intervention"
                        ]
                    }
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "levels": {
                    "name": "levels",
                    "isArray": true,
                    "type": {
                        "model": "LevelInterventionRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "intervention"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Interventions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Content": {
            "name": "Content",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "interventions": {
                    "name": "interventions",
                    "isArray": true,
                    "type": {
                        "model": "InterventionContentRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "content"
                        ]
                    }
                },
                "tags": {
                    "name": "tags",
                    "isArray": true,
                    "type": {
                        "model": "ContentContentTagRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "content"
                        ]
                    }
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Contents",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ContentTag": {
            "name": "ContentTag",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "contents": {
                    "name": "contents",
                    "isArray": true,
                    "type": {
                        "model": "ContentContentTagRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "contentTag"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ContentTags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Survey": {
            "name": "Survey",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "intervention": {
                    "name": "intervention",
                    "isArray": false,
                    "type": {
                        "model": "Intervention"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "interventionSurveysId"
                        ]
                    }
                },
                "questions": {
                    "name": "questions",
                    "isArray": true,
                    "type": {
                        "nonModel": "Question"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "tags": {
                    "name": "tags",
                    "isArray": true,
                    "type": {
                        "model": "SurveySurveyTagRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "survey"
                        ]
                    }
                },
                "surveyType": {
                    "name": "surveyType",
                    "isArray": false,
                    "type": {
                        "enum": "SurveyType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "archived": {
                    "name": "archived",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "interventionSurveysId": {
                    "name": "interventionSurveysId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Surveys",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "SurveyTag": {
            "name": "SurveyTag",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "surveys": {
                    "name": "surveys",
                    "isArray": true,
                    "type": {
                        "model": "SurveySurveyTagRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "surveyTag"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "SurveyTags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "InterventionTag": {
            "name": "InterventionTag",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "interventions": {
                    "name": "interventions",
                    "isArray": true,
                    "type": {
                        "model": "InterventionInterventionTagRelation"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "interventionTag"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "InterventionTags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Entity": {
            "name": "Entity",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "parentEntityID": {
                    "name": "parentEntityID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "level": {
                    "name": "level",
                    "isArray": false,
                    "type": {
                        "model": "Level"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "entityLevelId"
                        ]
                    }
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": {
                        "nonModel": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "customData": {
                    "name": "customData",
                    "isArray": true,
                    "type": {
                        "nonModel": "AppliedCustomData"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "appliedInterventions": {
                    "name": "appliedInterventions",
                    "isArray": true,
                    "type": {
                        "model": "AppliedIntervention"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "entityAppliedInterventionsId"
                        ]
                    }
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "entityLevelId": {
                    "name": "entityLevelId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Entities",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "AppliedIntervention": {
            "name": "AppliedIntervention",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "whoDidIt": {
                    "name": "whoDidIt",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "appliedInterventionWhoDidItId"
                        ]
                    }
                },
                "intervention": {
                    "name": "intervention",
                    "isArray": false,
                    "type": {
                        "model": "Intervention"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "appliedInterventionInterventionId"
                        ]
                    }
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": {
                        "nonModel": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "isOkay": {
                    "name": "isOkay",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "executedSurveys": {
                    "name": "executedSurveys",
                    "isArray": true,
                    "type": {
                        "model": "ExecutedSurvey"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "appliedInterventionExecutedSurveysId"
                        ]
                    }
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "entityAppliedInterventionsId": {
                    "name": "entityAppliedInterventionsId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "appliedInterventionWhoDidItId": {
                    "name": "appliedInterventionWhoDidItId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "appliedInterventionInterventionId": {
                    "name": "appliedInterventionInterventionId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "AppliedInterventions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "gsi-Entity.appliedInterventions",
                        "fields": [
                            "entityAppliedInterventionsId"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ExecutedSurvey": {
            "name": "ExecutedSurvey",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "appliedIntervention": {
                    "name": "appliedIntervention",
                    "isArray": false,
                    "type": {
                        "model": "AppliedIntervention"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "appliedInterventionExecutedSurveysId"
                        ]
                    }
                },
                "survey": {
                    "name": "survey",
                    "isArray": false,
                    "type": {
                        "model": "Survey"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "executedSurveySurveyId"
                        ]
                    }
                },
                "surveyID": {
                    "name": "surveyID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "whoExecutedIt": {
                    "name": "whoExecutedIt",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "executedSurveyWhoExecutedItId"
                        ]
                    }
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": {
                        "nonModel": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "answers": {
                    "name": "answers",
                    "isArray": true,
                    "type": {
                        "nonModel": "QuestionAnswer"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "appliedInterventionExecutedSurveysId": {
                    "name": "appliedInterventionExecutedSurveysId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "executedSurveySurveyId": {
                    "name": "executedSurveySurveyId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "executedSurveyWhoExecutedItId": {
                    "name": "executedSurveyWhoExecutedItId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ExecutedSurveys",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySurveyID",
                        "queryField": "executedSurveyBySurveyID",
                        "fields": [
                            "surveyID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Task": {
            "name": "Task",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dueDate": {
                    "name": "dueDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "finishedDate": {
                    "name": "finishedDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": {
                        "nonModel": "Location"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "taskUserId"
                        ]
                    }
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "entity": {
                    "name": "entity",
                    "isArray": false,
                    "type": {
                        "model": "Entity"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "taskEntityId"
                        ]
                    }
                },
                "appliedIntervention": {
                    "name": "appliedIntervention",
                    "isArray": false,
                    "type": {
                        "model": "AppliedIntervention"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "taskAppliedInterventionId"
                        ]
                    }
                },
                "executedSurvey": {
                    "name": "executedSurvey",
                    "isArray": false,
                    "type": {
                        "model": "ExecutedSurvey"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": [
                            "id"
                        ],
                        "targetNames": [
                            "taskExecutedSurveyId"
                        ]
                    }
                },
                "schemeVersion": {
                    "name": "schemeVersion",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "picIDs": {
                    "name": "picIDs",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "audioIDs": {
                    "name": "audioIDs",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "taskUserId": {
                    "name": "taskUserId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "taskEntityId": {
                    "name": "taskEntityId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "taskAppliedInterventionId": {
                    "name": "taskAppliedInterventionId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "taskExecutedSurveyId": {
                    "name": "taskExecutedSurveyId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Tasks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUser",
                        "queryField": "taskByUserID",
                        "fields": [
                            "userID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "SessionData": {
            "name": "SessionData",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "app": {
                    "name": "app",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "version": {
                    "name": "version",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "buildNumber": {
                    "name": "buildNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "remoteConfig": {
                    "name": "remoteConfig",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "platform": {
                    "name": "platform",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "SessionData",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "TestObject": {
            "name": "TestObject",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "age": {
                    "name": "age",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "TestObjects",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "organization_id",
                                "allow": "owner",
                                "identityClaim": "custom:organization_id",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "LevelInterventionRelation": {
            "name": "LevelInterventionRelation",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "levelId": {
                    "name": "levelId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "interventionId": {
                    "name": "interventionId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "level": {
                    "name": "level",
                    "isArray": false,
                    "type": {
                        "model": "Level"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "levelId"
                        ]
                    }
                },
                "intervention": {
                    "name": "intervention",
                    "isArray": false,
                    "type": {
                        "model": "Intervention"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "interventionId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "LevelInterventionRelations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byLevel",
                        "fields": [
                            "levelId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byIntervention",
                        "fields": [
                            "interventionId"
                        ]
                    }
                }
            ]
        },
        "InterventionContentRelation": {
            "name": "InterventionContentRelation",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "interventionId": {
                    "name": "interventionId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "contentId": {
                    "name": "contentId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "intervention": {
                    "name": "intervention",
                    "isArray": false,
                    "type": {
                        "model": "Intervention"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "interventionId"
                        ]
                    }
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": {
                        "model": "Content"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "contentId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "InterventionContentRelations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byIntervention",
                        "fields": [
                            "interventionId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byContent",
                        "fields": [
                            "contentId"
                        ]
                    }
                }
            ]
        },
        "InterventionInterventionTagRelation": {
            "name": "InterventionInterventionTagRelation",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "interventionId": {
                    "name": "interventionId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "interventionTagId": {
                    "name": "interventionTagId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "intervention": {
                    "name": "intervention",
                    "isArray": false,
                    "type": {
                        "model": "Intervention"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "interventionId"
                        ]
                    }
                },
                "interventionTag": {
                    "name": "interventionTag",
                    "isArray": false,
                    "type": {
                        "model": "InterventionTag"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "interventionTagId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "InterventionInterventionTagRelations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byIntervention",
                        "fields": [
                            "interventionId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byInterventionTag",
                        "fields": [
                            "interventionTagId"
                        ]
                    }
                }
            ]
        },
        "ContentContentTagRelation": {
            "name": "ContentContentTagRelation",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "contentId": {
                    "name": "contentId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "contentTagId": {
                    "name": "contentTagId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": {
                        "model": "Content"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "contentId"
                        ]
                    }
                },
                "contentTag": {
                    "name": "contentTag",
                    "isArray": false,
                    "type": {
                        "model": "ContentTag"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "contentTagId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ContentContentTagRelations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byContent",
                        "fields": [
                            "contentId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byContentTag",
                        "fields": [
                            "contentTagId"
                        ]
                    }
                }
            ]
        },
        "SurveySurveyTagRelation": {
            "name": "SurveySurveyTagRelation",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "surveyId": {
                    "name": "surveyId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "surveyTagId": {
                    "name": "surveyTagId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "survey": {
                    "name": "survey",
                    "isArray": false,
                    "type": {
                        "model": "Survey"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "surveyId"
                        ]
                    }
                },
                "surveyTag": {
                    "name": "surveyTag",
                    "isArray": false,
                    "type": {
                        "model": "SurveyTag"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetNames": [
                            "surveyTagId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "SurveySurveyTagRelations",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySurvey",
                        "fields": [
                            "surveyId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySurveyTag",
                        "fields": [
                            "surveyTagId"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "PermissionType": {
            "name": "PermissionType",
            "values": [
                "READ",
                "CHANGEMASTERDATA",
                "CREATEINTERVENTIONS",
                "EXECUTESURVEYS",
                "CREATESUBENTITIES",
                "ADMIN"
            ]
        },
        "InterventionType": {
            "name": "InterventionType",
            "values": [
                "TECHNOLOGY",
                "EDUCATION"
            ]
        },
        "QuestionType": {
            "name": "QuestionType",
            "values": [
                "TEXT",
                "SINGLECHOICE",
                "MULTIPLECHOICE",
                "PICTURE",
                "PICTUREWITHTAGS",
                "AUDIO",
                "INT",
                "DOUBLE",
                "RATING"
            ]
        },
        "SurveyType": {
            "name": "SurveyType",
            "values": [
                "INITIAL",
                "DEFAULT"
            ]
        },
        "Type": {
            "name": "Type",
            "values": [
                "INT",
                "STRING"
            ]
        }
    },
    "nonModels": {
        "I18nString": {
            "name": "I18nString",
            "fields": {
                "languageKeys": {
                    "name": "languageKeys",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "languageTexts": {
                    "name": "languageTexts",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                }
            }
        },
        "Permission": {
            "name": "Permission",
            "fields": {
                "permissionType": {
                    "name": "permissionType",
                    "isArray": false,
                    "type": {
                        "enum": "PermissionType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "allowedEntities": {
                    "name": "allowedEntities",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                }
            }
        },
        "ColorTheme": {
            "name": "ColorTheme",
            "fields": {
                "highlight": {
                    "name": "highlight",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "secondaryHighlight": {
                    "name": "secondaryHighlight",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "backgroundOneLight": {
                    "name": "backgroundOneLight",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "backgroundTwoLight": {
                    "name": "backgroundTwoLight",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "backgroundOneDark": {
                    "name": "backgroundOneDark",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "backgroundTwoDark": {
                    "name": "backgroundTwoDark",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Question": {
            "name": "Question",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "QuestionType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "questionOptions": {
                    "name": "questionOptions",
                    "isArray": true,
                    "type": {
                        "nonModel": "QuestionOption"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "isFollowUpQuestion": {
                    "name": "isFollowUpQuestion",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "QuestionOption": {
            "name": "QuestionOption",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "followUpQuestionIDs": {
                    "name": "followUpQuestionIDs",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "CustomData": {
            "name": "CustomData",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "Type"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Location": {
            "name": "Location",
            "fields": {
                "latitude": {
                    "name": "latitude",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "longitude": {
                    "name": "longitude",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "AppliedCustomData": {
            "name": "AppliedCustomData",
            "fields": {
                "customDataID": {
                    "name": "customDataID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "Type"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": {
                        "nonModel": "I18nString"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "intValue": {
                    "name": "intValue",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "stringValue": {
                    "name": "stringValue",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "QuestionAnswer": {
            "name": "QuestionAnswer",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "questionID": {
                    "name": "questionID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "QuestionType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "intValue": {
                    "name": "intValue",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "doubleValue": {
                    "name": "doubleValue",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "rating": {
                    "name": "rating",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "questionOptions": {
                    "name": "questionOptions",
                    "isArray": true,
                    "type": {
                        "nonModel": "QuestionOption"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "markings": {
                    "name": "markings",
                    "isArray": true,
                    "type": {
                        "nonModel": "Marking"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "Marking": {
            "name": "Marking",
            "fields": {
                "x": {
                    "name": "x",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "y": {
                    "name": "y",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "rx": {
                    "name": "rx",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "ry": {
                    "name": "ry",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.3.2",
    "version": "cc0397e401109c26c23f5281c025ca7e"
};
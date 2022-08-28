export default {
    "openapi": "3.0.2",
    "basePath": "/v1",
    "info": {
        "title": "Weather and Forecast API",
        "version": "0.1.0"
    },
    "definitions": {},
    "paths": {
        "/location": {
            "get": {
                "summary": "Current location",
                "description": "Get current location by client IP",
                "parameters": {},
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "type": "integer"
                                        },
                                        "data": {
                                            "type": "object",
                                            "required": [
                                                "lat",
                                                "lon",
                                                "city",
                                                "province",
                                                "country"
                                            ],
                                            "properties": {
                                                "lat": {
                                                    "type":"integer"
                                                },
                                                "lon": {
                                                    "type":"integer"
                                                },
                                                "city": {
                                                    "type": "string"
                                                },
                                                "province": {
                                                    "type": "string"
                                                },
                                                "country": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    }
                                },
                                "examples": {
                                    "response":{
                                        "summary": "Example OK response",
                                        "value": {
                                            "code": 200,
                                            "data": {
                                                "lat": -20,
                                                "lon": 10,
                                                "city": "Buenos Aires",
                                                "province": "Buenos Aires",
                                                "country": "Argentina"
                                            } 
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        }
    }
}
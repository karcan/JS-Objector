(function(global){
    class kObject {
        constructor(object){
            return new this.init(object);
        }
        init = class {
            constructor(object){
                return this.resolve(object);
            }
            to_new_object (object){
                return true
            }
            to_object_list(object){
                return false
            }
            resolve (object){
                switch (true){
                    case this.to_new_object(object):
                        console.log('to new object')
                        return new kObject.object(object);
                        break
                    case this.to_object_list(object):
                        console.log('to object list')
                        return new kObject.object_list(object);
                        break
                }
            }
        }
    }
    
    class _shared{
        constructor(object){
        }
    }

    kObject.object = class extends _shared{
        constructor(object){
            super();
            this.__data = {object: object, properties : {}}
        }
        keys(object){
            return Object.keys(object);
        }
        property(properties){
            let key = this.keys(properties);
            this.__data.properties[key] = properties[key];  
            return this;
        }
    }
    
    kObject.object_list = class {
        constructor(object){

        }
    }

    global.kObject = global.$o = kObject;
}(window));


var a = new $o({a:1})
.property({name:{defaultValue:"", nullable: false, dataType:"String"}})
.property({surname:{defaultValue:"", nullable: false, dataType:"String"}})
.property({country:{defaultValue:"90", nullable: false, dataType:"Number"}});
console.log(a);

var a = new $o({a:1})
console.log(a);
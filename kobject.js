(function(global){

    class kObject {
        constructor(object){
            return new kObject.ct(object);
        }
    }

    kObject.ct = class {
        constructor(object){
            this._object = object;
            return this.resolve();
        }
        resolve(){
            return new kObject.new_object(this._object);
        }
    }

    kObject.new_object = class {
        constructor(object){
            this.__data = {
                object : object,
                properties : {}
            };
        }
        get(){
            return this;
        }
    }

    kObject.list_object = class {
        constructor(object){
            this.__data = {
                object : object
            };
        }
    }

    global.kObject = global.$kO = kObject;
}(window));

(function(to){

    class kObjector {
        constructor(object){
            return new kObjector.fn(object);
        }
    }

    kObjector.fn = class {
        constructor(object){
            this.o = object;
            return this.resolve();
        }
        new_object(){
            // TODO CHECK FOR NEW_OBJECT
            if(this.o)
                return true;
        }
        list_object(){
            // TODO CHECK FOR EXISTS OBJECT
            if(this.o)
                return false;
        }
        resolve(){
            switch (true) {
                case this.new_object():
                    return new kObjector.new_object(this.o);
                    break;
                case this.list_object():
                    return new kObjector.list_object(this.o);
                    break;
                default:
                    break;
            }
        }
    }

    kObjector._shared = class{
        constructor(){

        }
        _uuid(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16);});
        }
        _types(){
            return ["Boolean" , "Number" , "BigInt", "String" , "Symbol" , "Date" , "Object"];
        }
        _getType(d){
            if(!d && d != false)
            return null;

            let self = d.constructor;
            return  (self.name ||
                  (String(self).match ( /^function\s*([^\s(]+)/im)
                    || [0,'ANONYMOUS_CONSTRUCTOR']) [1] );
        }
    }

    kObjector.new_object = class extends kObjector._shared {

        constructor(object){
                super();
                this.__storage = {
                    object: object , 
                    properties : {}
            }

        }

        firstKey(key){return Object.keys(key)[0];}
        getObject(){return this.__storage.object}
        getProperties(){return this.__storage.properties}
        defineProperty(object,property){
            let self = this;
            let prop = this.getProperties()[property];
            let defineProperty = {};

            ([undefined,true].includes(prop.writable)) || (defineProperty["writable"] = false);
            defineProperty["configurable"] = ([undefined,true].includes(prop.configurable) ? true : false);
            defineProperty["unumerable"] = ([undefined,true].includes(prop.unumerable) ? true : false);

            // defaultValue for functional or static value
            prop.defaultValue = ((self._getType((object.__data.fields[property].value || prop.defaultValue)) == "Function") ? (object.__data.fields[property].value || prop.defaultValue)() : (object.__data.fields[property].value || prop.defaultValue));

            if(([undefined,true].includes(prop.writable) ? true : false)){
                // GETTER
                defineProperty.get = function(){
                    return prop.defaultValue;
                }
                // SETTER
                defineProperty.set = function(val){
                    object.__data.fields[property].value = val;
                }
            }else{
                defineProperty["value"] = prop.defaultValue;
            }

            return Object.defineProperty(object, property,defineProperty);
            
        }

        property(prop){
            let key = this.firstKey(prop);
            this.getProperties()[key] =  prop[key];
            return this;
        }
        properties(prop){
            for(let [key,value] of Object.entries(prop)){
                this.property({[key] : value});
            }
            return this;
        }
        create(){
            let self = this;
            return new class {
                constructor(){
                    // create uuid property.
                    !(self.getObject().uuid || null) || Object.defineProperty(this, "_uuid", {writable : false, value : self._uuid()})
                    // create __data object for field info
                    this.__data = {fields:{}, is_modified : false, modified_date : null, modified_fields : []}

                    // create all properties
                    for(let item in self.getProperties()){
                        // default keys for property
                        this.__data.fields[item] = {value : self.getProperties()[item].defaultValue, is_modified : false, modified_date : null}
                        // define property
                        self.defineProperty(this,item);
                    }           

                }
                __serialize(){
                    let result = {_uuid : this._uuid};
                    Object.keys(this)
                    .map(k=>{
                        if(!["Object","Function"].includes(self._getType(this[k])))
                        result[k] = this[k];
                    });
                    return result;
                }
            }
        }
    }

    to.kObjector = to.$kO = kObjector;
}(window));
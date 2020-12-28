import{IdentifierSite} from '../core/IdentifierSite';
import { LoopValue } from '../core/LoopValue';

class ReplaceText{
    private data:[] = [];
    private templateGroup:Array<LoopValue> = new Array();
    private identifier:Array<IdentifierSite> = new Array();
    private textValue:string = "";

    public setData(data:[]){
        this.data = data;
    }

    public setIdentifier(identifier:Array<IdentifierSite>){
        this.identifier = identifier;
    }

    public setTextValue(textValue:string){
        this.textValue = textValue;
    }

    public setTemplateGroup(templateGroup:Array<LoopValue>){
        this.templateGroup = templateGroup;
    }

    public replace():string{
        return this.replaceValue();
    }

    private replaceValue():string{
        var retAllText:string = "";
        this.templateGroup.forEach(value=>{
            var retTextValue:string = '';
            if(value.isLoop){
                this.data.forEach((arr)=>{

                    var repTextValue:string = value.value;
    
                    this.identifier.forEach((item)=>{
                        repTextValue = repTextValue.replace(item.value,arr[item.x][item.y]);
                    });
        
                    retTextValue+=repTextValue;
                    retTextValue+='\n';
                });
            }else{
                var repTextValue:string = value.value;
    
                this.identifier.forEach((item)=>{
                    repTextValue = repTextValue.replace(item.value,this.data[item.x][item.y]);
                });
    
                retTextValue+=repTextValue;
                retTextValue+='\n';
            }
            retAllText+=retTextValue;
        });
        // this.data.forEach((arr)=>{
        //     var repTextValue:string = this.textValue;
        //     this.identifier.forEach((item)=>{
        //         repTextValue = repTextValue.replace(item.value,arr[item.x][item.y]);
        //     });

        //     retTextValue+=repTextValue;
        //     retTextValue+='\n';
        // });
        return retAllText;
    }
}
export default ReplaceText;
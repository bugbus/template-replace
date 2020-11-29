import{IdentifierSite} from '../core/IdentifierSite';

class ReplaceText{
    private data:[] = [];
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

    public replace():string{
        return this.replaceValue();
    }

    private replaceValue():string{
        var retTextValue:string = "";
        this.data.forEach((arr)=>{
            var repTextValue:string = this.textValue;
            this.identifier.forEach((item)=>{
                repTextValue = repTextValue.replace(item.value,arr[item.x][item.y]);
            });

            retTextValue+=repTextValue;
            retTextValue+='\n';
        });
        return retTextValue;
    }
}
export default ReplaceText;
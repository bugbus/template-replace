import * as assert from 'assert';
import * as vscode from 'vscode';
import MakeReplaceValue from '../../usercase/MakeReplaceValue';

suite("testMakeReplaceValue",()=>{
    vscode.window.showInformationMessage('MakeReplaceValue tests.');
    var word = '13123123';//输入文件中的文字
    var template = '';//模版文件中的文字
    var testRV = new MakeReplaceValue(word,template);

    test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
	});
});
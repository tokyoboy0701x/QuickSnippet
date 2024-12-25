import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let snippets: { [key: string]: string } = {};

    // Команда для сохранения сниппета
    let saveSnippet = vscode.commands.registerCommand('extension.saveSnippet', async () => {
        const snippetName = await vscode.window.showInputBox({ prompt: 'Введите имя сниппета' });
        const snippetCode = await vscode.window.showInputBox({ prompt: 'Введите код сниппета' });

        if (snippetName && snippetCode) {
            snippets[snippetName] = snippetCode;
            vscode.window.showInformationMessage(`Сниппет "${snippetName}" сохранен!`);
        }
    });

    // Команда для вставки сниппета
    let insertSnippet = vscode.commands.registerCommand('extension.insertSnippet', async () => {
        const snippetName = await vscode.window.showQuickPick(Object.keys(snippets), { placeHolder: 'Выберите сниппет для вставки' });
        if (snippetName) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, snippets[snippetName]);
                });
            }
        }
    });

    context.subscriptions.push(saveSnippet, insertSnippet);
}

export function deactivate() {}
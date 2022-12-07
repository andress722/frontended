// When you add the ckeditor5 folder you can import it this way

import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export default function CEditor({ htmlData, setData }) {
	return (
		<CKEditor
			editor={DecoupledEditor}
			data={htmlData}
			onChange={(event, editor) => {
				const data = editor.getData();
				console.log({ event, editor, data });
				setData(data);
			}}
			disabled
		/>
	);
}

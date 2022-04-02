import { CKEditor } from 'ckeditor4-react';
import { memo } from 'react';
function Editor({ content,onEditorChange }) {
    return (
        <CKEditor
          data={content}
          onChange={onEditorChange}
        />
    );
  }
  export default memo(Editor);
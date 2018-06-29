import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css';

import './index.scss';

// 通用富文本编辑器
class RichEditor extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.loadEditor();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }

    loadEditor() {
        let elem = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(elem),
            placeholder: this.props.placeholder || '请输入内容',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'file_upload'
            }
        });
        this.bindEditorEvent();
    }

    // 初始化富文本编辑器的事件
    bindEditorEvent() {
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue());
        })
    }
    
    render() {
        return (
          <div className="rich-editor">
              <textarea ref="textarea">
              
              </textarea>
          </div>
        );
    }
}

export default RichEditor;
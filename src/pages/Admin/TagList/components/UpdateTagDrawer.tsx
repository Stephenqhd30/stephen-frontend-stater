import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, message } from 'antd';
import React from 'react';
import { updateTagUsingPost } from '@/services/stephen-backend/tagController';
import { TagStatusEnum } from '@/enums/TagStatusEnum';

interface UpdateProps {
  oldData?: API.TagVO;
  onCancel: () => void;
  onSubmit: (values: API.TagUpdateRequest) => Promise<void>;
  visible: boolean;
  columns: ProColumns<API.TagVO>[];
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.TagUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    await updateTagUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  }
};
const UpdateTagDrawer: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel, columns } = props;
  if (!oldData) {
    return <></>;
  }

  return (
    <Drawer destroyOnClose title={'更新标签信息'} open={visible} onClose={() => onCancel?.()}>
      <ProTable
        type={'form'}
        form={{
          initialValues: {
            ...oldData,
            isParent: oldData.isParent === TagStatusEnum.NOT_IS_PARENT ? '是父标签' : '不是父标签',
          },
        }}
        columns={columns}
        onSubmit={async (values: API.TagUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData?.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Drawer>
  );
};
export default UpdateTagDrawer;

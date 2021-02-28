import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { getPermits } from "../../api_functions";

export default function RoleEditForm({ hideForm, onSubmit, currentRole }) {
  const [form] = Form.useForm();
  const [permitList, setPermitList] = useState([]);

  useEffect(() => {
    getPermits().then((list) => {
      setPermitList(list);
    });
  }, []);

  const onUpdate = () => {
    form.validateFields().then(({ permitIds, ...formValues }) => {
      const permits = permitIds.map((id) => {
        return { permit: { id } };
      });
      onSubmit({ ...currentRole, ...formValues, permits });
    });
  };

  const getInitialPermits = () => currentRole.permits.map((rp) => rp.permit.id);

  return (
    <Modal
      visible
      title="Editar Role"
      okText="Actualizar"
      onCancel={hideForm}
      onOk={onUpdate}
    >
      <Form
        form={form}
        layout="vertical"
        name="edit_role_form"
        initialValues={{ ...currentRole, permitIds: getInitialPermits() }}
      >
        <Form.Item
          name="role"
          label="Nombre del Rol"
          rules={[{ required: true }]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="permitIds"
          label="Permisos"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Seleccione los permisos"
          >
            {permitList.map((p) => (
              <Select.Option value={p.id} key={p.id}>
                {p.displayName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

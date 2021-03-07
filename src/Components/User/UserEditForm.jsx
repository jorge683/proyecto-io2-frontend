import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { getRoles } from "../../api_functions";

export default function UserEditForm({ hideForm, onSubmit, currentUser }) {
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    getRoles().then((list) => {
      setRoleList(list);
    });
  }, []);

  const onUpdate = () => {
    form.validateFields().then(({ roleIds, ...formValues }) => {
      const roles = roleList.filter(r => roleIds.includes(r.id));

      const updatedUser = { ...currentUser, ...formValues, roles };
      onSubmit(updatedUser);
    });
  };

  const getInitialRoles = () => currentUser.roles.map((r) => r.id);

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
        name="edit_user_form"
        initialValues={{ ...currentUser, roleIds: getInitialRoles() }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Nombre de usuario"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="encrytedPassword"
              label="Contraseña"
              rules={[{ required: true }]}
            >
              <Input type="password" autoComplete="new-password" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="roleIds"
              label="Roles"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Seleccione los roles"
              >
                {roleList.map(({ id, role }) => (
                  <Select.Option value={id} key={id}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="nombre" label="Nombre">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="apellido" label="Apellido">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

import React, { useEffect, useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { getProjects, getTasks } from "../../api_functions";

const SOption = Select.Option;

export default function CreateTaskForm({ hideForm, onSubmit }) {
  const [form] = Form.useForm();
  const [taskList, setTaskList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getTasks().then((list) => {
      setTaskList(list);
    });

    getProjects().then((list) => {
      setProjectList(list);
    });
  }, []);

  const onCreate = () => {
    form.validateFields().then((formValues) => {
      onSubmit(formValues);
    });
  };

  return (
    <Modal
      visible
      title="Crear tarea"
      okText="Crear"
      onCancel={hideForm}
      onOk={onCreate}
    >
      <Form form={form} layout="vertical" name="creation_task_form">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="descripcion"
              label="Descripción"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="estado"
              label="Estado"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Seleccione un estado"
              >
                <SOption value="iniciado">Iniciado</SOption>
                <SOption value="pendiente">Pendiente</SOption>
                <SOption value="finalizado">Finalizado</SOption>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name={["proyecto", "id"]}
              label="Proyecto"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Seleccione el proyecto"
              >
                {projectList.map(({ id, nombre }) => (
                  <Select.Option value={id} key={id}>
                    {nombre}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="idTareaPadre" label="Tarea Padre">
              <Select
                style={{ width: "100%" }}
                placeholder="Seleccione la tarea padre"
              >
                {taskList.map(({ id, descripcion }) => (
                  <Select.Option value={id} key={id}>
                    {descripcion}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

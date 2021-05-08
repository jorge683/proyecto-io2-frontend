import React, { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";
import { getProjects, getTasks } from "../../api_functions";

export default function BaseLineCreationForm({ hideForm, onSubmit }) {
  const [form] = Form.useForm();
  const [taskList, setTaskList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getProjects().then((list) => {
      setProjectList(list);
    });
  }, []);

  const onCreate = () => {
    form.validateFields().then(({ taskIds = [], ...formValues }) => {
      const tareas = taskIds.map((id) => {
        return { id };
      });
      onSubmit({ tareas });
    });
  };

  const onChangeProject = (projectId) => {
    form.resetFields(["taskIds"]);
    getTasks().then((list) => {
      setTaskList(
        list.filter((t) => t.proyecto.id === projectId && !t.lineaBase)
      );
    });
  };

  return (
    <Modal
      visible
      title="Crear linea base"
      okText="Crear"
      onCancel={hideForm}
      onOk={onCreate}
    >
      <Form form={form} layout="vertical" name="creation_base_line_form">
        <Form.Item name={["proyecto", "id"]} rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            placeholder="Seleccione el proyecto"
            onChange={onChangeProject}
          >
            {projectList.map(({ id, nombre }) => (
              <Select.Option value={id} key={id}>
                {nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="taskIds" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Seleccione las tareas"
            disabled={!Boolean(form.getFieldValue(["proyecto", "id"]))}
          >
            {taskList.map(({ id, descripcion }) => (
              <Select.Option value={id} key={id}>
                {descripcion}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

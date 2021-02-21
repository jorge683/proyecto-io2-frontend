import React from "react";
import { Typography, Layout, Menu, Card, Row, Col, Statistic } from "antd";
import {
  UsergroupAddOutlined,
  ControlOutlined,
  FundProjectionScreenOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Title, Link } = Typography;

const { Content, Header } = Layout;

export default function DashboardScreen(props) {
  const { username = "Hola" } = props.location.state;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <div style={{ float: "right" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">{username.toUpperCase()}</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Title>Bienvenido al sistema SAIP</Title>
        <Row gutter={16} justify="space-around">
          <Col span={6}>
            <CustomCard
              title="Administración"
              desc="Crear Roles, Crear Usuarios, Asignar Roles a Usuarios"
              statDataList={[
                {
                  title: "Usuarios",
                  value: 20,
                  prefix: <UsergroupAddOutlined />,
                },
                {
                  title: "Roles",
                  value: 5,
                  prefix: <ControlOutlined />,
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <CustomCard
              title="Desarrollo"
              desc="Crear Proyecto, Crear o agregar Tareas a proyecto, Conectar Tareas"
              statDataList={[
                {
                  title: "Proyectos",
                  value: 12,
                  prefix: <FundProjectionScreenOutlined />,
                },
                {
                  title: "Tareas",
                  value: 56,
                  prefix: <UnorderedListOutlined />,
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <CustomCard
              title="Gestión de la Configuración"
              desc="Crear línea base, Visualizar líneas bases en Tabla"
              statDataList={[
                {
                  title: "Total Lineas Base",
                  value: 114,
                  prefix: <FundProjectionScreenOutlined />,
                },
                {
                  title: "Proyectos",
                  value: 12,
                  prefix: <FundProjectionScreenOutlined />,
                },
              ]}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

const CustomCard = ({ title, desc, statDataList = [] }) => {
  const [stat1, stat2] = statDataList;
  return (
    <Card
      hoverable
      cover={
        <Card>
          <Row>
            <Col span={12}>
              <Statistic valueStyle={{ color: "#3f8600" }} {...stat1} />
            </Col>
            <Col span={12}>
              <Statistic valueStyle={{ color: "#3f8600" }} {...stat2} />
            </Col>
          </Row>
        </Card>
      }
    >
      <Card.Meta
        title={<Link target="_blank">{title}</Link>}
        description={desc}
      />
    </Card>
  );
};

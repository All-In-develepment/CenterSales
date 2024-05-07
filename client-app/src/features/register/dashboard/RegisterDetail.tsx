import { useEffect } from "react";
import { Register } from "../../../app/models/register";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Card } from "semantic-ui-react";

interface Props {
  registerObj: Register;
}

export default function RegisterDetail( {registerObj}: Props ) {
  const { registerStore } = useStore();
  const { selectedRegister: register, loadRegister, loadingInitial, clearSelectedRegister } = registerStore;
  const id  = registerObj.registerId;
  
  loadRegister(id);

  useEffect(() => {
    if (id) loadRegister(id);
  }
  , [id, loadRegister, clearSelectedRegister]);

  if (loadingInitial || !register) return <LoadingComponent />

  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>Data: {register.registerDate.split("T")[0]}</Card.Header>
        <Card.Meta>
          <span className="date">Vendedor: {register.sellerName}</span>
        </Card.Meta>
        <Card.Meta>
          <span className="date">Evento: {register.eventsName}</span>
        </Card.Meta>
        <Card.Description>
          <p>Total de leads: {register.registerLeads}</p>
          <p>Leads convertidos: {register.registerTotal}</p>
          <p>Média de conversão: {register.registerAVGConversion}%</p>
          <p>Total depositado: R${register.registerAmount}</p>
          <p>Média de depósito: R${register.registerAVG}</p>
          <p>Evento de origem: {register.eventsName}</p>
          <p>Projeto: {register.projectName}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>Casa de Aposta: {register.bookmakerName}</p>
      </Card.Content>
    </Card>
  )
}
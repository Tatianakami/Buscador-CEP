import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios'; // Importando o axios
import './styles.css';

function App() {
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState(null); // Para armazenar os dados do endereço

  // Função que lida com a mudança no input
  async function handleInputChange(event) {
    const value = event.target.value;

    // Permite digitar apenas números e garante que o valor seja atualizado
    if (/^\d*$/.test(value)) {
      setCep(value);
      setError(''); // Limpa a mensagem de erro
    }
  }

  // Função que lida com a busca do CEP
  async function handleSearch() {
    // Verifica se o CEP está vazio
    if (cep === '') {
      setError('Digite um CEP válido.');
      return;
    }

    // Verifica se o CEP tem exatamente 8 dígitos
    if (cep.length !== 8) {
      setError('O CEP deve conter 8 dígitos.');
      return;
    }

    try {
      // o axios para fazer a requisição
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      
      // Verifica se a API retornou um erro
      if (response.data.erro) {
        setError('CEP não encontrado');
        setAddress(null);
      } else {
        setError(''); // Limpa a mensagem de erro
        setAddress(response.data); // Atualiza o endereço com os dados retornados
      }
    } catch (error) {
      setError('Erro ao buscar CEP');
      setAddress(null);
    }
  }

  // Função para chamar a busca ao pressionar a tecla Enter
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={cep}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // Adiciona o evento de tecla
          maxLength={8}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <main className="main">
        {address && (
          <>
            <h2>{address.cep}</h2>
            <span>Rua: {address.logradouro}</span>
            <span>Complemento: {address.complemento}</span>
            <span>Bairro: {address.bairro}</span>
            <span>Cidade: {address.localidade}</span>
            <span>Estado: {address.uf}</span>
          </>
        )}
      </main>

      <div className="line-vertical"></div>
      <div className="line-vertical"></div>
      <div className="line-vertical"></div>
      <div className="line-vertical"></div>
      <div className="line-vertical"></div>

      <div className="line-horizontal"></div>
      <div className="line-horizontal"></div>
      <div className="line-horizontal"></div>
      <div className="line-horizontal"></div>
      <div className="line-horizontal"></div>
    </div>
  );
}

export default App;

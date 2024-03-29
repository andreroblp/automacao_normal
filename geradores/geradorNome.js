import gerarNumero from './geradorNumero.js';

export default function gerarNome(sexo, nomeSocial) {

        if (sexo === "M" && nomeSocial === true) {
            return nomeMasculinoSocial();
        } else if (sexo === "M" && nomeSocial === false) {
            return NomeMasculino();
        } else if (sexo === "F" && nomeSocial === true) {
            return NomeFemininoSocial();
        } else {
            return NomeFeminino();
        }

    function nomeMasculinoSocial() {
        return nomesMasculinos[gerarNumero(0,9)][gerarNumero(0,9)] + " " + nomeMeio[gerarNumero(0,9)][gerarNumero(0,9)];
    }

    function NomeMasculino() {
        return nomesMasculinos[gerarNumero(0,9)][gerarNumero(0,9)] + " " + nomeMeio[gerarNumero(0,9)][gerarNumero(0,9)] + " " + sobrenome[gerarNumero(0,99)][gerarNumero(0,9)];
    }

    function NomeFemininoSocial() {

        return nomesFemininos[gerarNumero(0,9)][gerarNumero(0,9)] + " " + nomeMeio[gerarNumero(0,9)][gerarNumero(0,9)];
    }
    function NomeFeminino() {
        return nomesFemininos[gerarNumero(0,9)][gerarNumero(0,9)] + " " + nomeMeio[gerarNumero(0,9)][gerarNumero(0,9)] + " " + sobrenome[gerarNumero(0,99)][gerarNumero(0,9)];
    }

}

var nomesMasculinos = [['Miguel', 'Davi', 'Gabriel', 'Arthur', 'Lucas', 'Matheus', 'Pedro', 'Guilherme', 'Gustavo', 'Rafael'],
['Felipe', 'Bernardo', 'Enzo', 'Nicolas', 'João Pedro', 'Pedro Henrique', 'Cauã', 'Vitor', 'Eduardo', 'Daniel'],
['Henrique', 'Murilo', 'Vinicius', 'Samuel', 'Pietro', 'João Vitor', 'Leonardo', 'Caio', 'Heitor', 'Lorenzo'],
['Isaac', 'Lucca', 'Thiago', 'João Gabriel', 'João', 'Theo', 'Bruno', 'Bryan', 'Carlos Eduardo', 'Luiz Felipe'],
['Breno', 'Emanuel', 'Ryan', 'Vitor Hugo', 'Yuri', 'Benjamin', 'Erick', 'Enzo Gabriel', 'Fernando', 'Joaquim'],
['André', 'Tomás', 'Francisco', 'Rodrigo', 'Igor', 'Antonio', 'Ian', 'Luiz Otávio', 'Juan', 'João Guilherme'],
['Diogo', 'Otávio', 'Nathan', 'Calebe', 'Danilo', 'Luan', 'Luiz Henrique', 'Kaique', 'Alexandre', 'João Miguel'],
['Iago', 'Ricardo', 'Raul', 'Marcelo', 'Julio César', 'Cauê', 'Benício', 'Vitor Gabriel', 'Augusto', 'Pedro Lucas'],
['Luiz Gustavo', 'Giovanni', 'Renato', 'Diego', 'João Paulo', 'Renan', 'Luiz Fernando', 'Anthony', 'Lucas Gabriel', 'Thales'],
['Luiz Miguel', 'Henry', 'Marcos Vinicius', 'Kevin', 'Levi', 'Enrico', 'João Lucas', 'Hugo', 'Luiz Guilherme', 'Matheus Henrique']];

var nomesFemininos = [['Helena', 'Alice', 'Laura', 'Maria Alice', 'Sophia', 'Manuela', 'Maitê', 'Liz', 'Cecília', 'Isabella'],
['Luísa', 'Eloá', 'Heloísa', 'Júlia', 'Ayla', 'Maria Luísa', 'Isis', 'Elisa', 'Antonella', 'Valentina'],
['Maya', 'Maria Júlia', 'Aurora', 'Lara', 'Maria Clara', 'Lívia', 'Esther', 'Giovanna', 'Sarah', 'Maria Cecília'],
['Lorena', 'Beatriz', 'Rebeca', 'Luna', 'Olívia', 'Maria Helena', 'Mariana', 'Isadora', 'Melissa', 'Maria'],
['Catarina', 'Lavínia', 'Alícia', 'Maria Eduarda', 'Agatha', 'Ana Liz', 'Yasmin', 'Emanuelly', 'Ana Clara', 'Clara'],
['Ana Júlia', 'Marina', 'Stella', 'Jade', 'Maria Liz', 'Ana Laura', 'Maria Isis', 'Ana Luísa', 'Gabriela', 'Alana'],
['Rafaela', 'Vitória', 'Isabelly', 'Bella', 'Milena', 'Clarice', 'Mirella', 'Ana', 'Emilly', 'Betina'],
['Mariah', 'Zoe', 'Maria Vitória', 'Nicole', 'Laís', 'Melina', 'Bianca', 'Louise', 'Ana Beatriz', 'Heloíse'],
['Malu', 'Melinda', 'Letícia', 'Maria Valentina', 'Chloe', 'Maria Elisa', 'Maria Heloísa', 'Maria Laura', 'Maria Fernanda', 'Ana Cecília'],
['Hadassa', 'Ana Vitória', 'Diana', 'Ayla Sophia', 'Eduarda', 'Ana Lívia', 'Isabel', 'Elis', 'Pérola', 'Joana']]

var nomeMeio = [['da Silva', 'dos Santos', 'Pereira', 'Ferreira', 'de Oliveira', 'Silva', 'Rodrigues', 'de Souza', 'Gomes', 'Santos'],
['Oliveira', 'Ribeiro', 'Martins', 'Gonçalves', 'Soares', 'Barbosa', 'Lopes', 'Vieira', 'Souza', 'Fernandes'],
['Lima', 'Costa', 'Batista', 'Dias', 'Moreira', 'de Lima', 'de Sousa', 'Nunes', 'da Costa', 'de Almeida'],
['Mendes', 'Carvalho', 'Araujo', 'Cardoso', 'Teixeira', 'Marques', 'do Nascimento', 'Almeida', 'Ramos', 'Machado'],
['Rocha', 'Nascimento', 'de Araujo', 'da Conceiçao', 'Bezerra', 'Sousa', 'Borges', 'Santana', 'de Carvalho', 'Aparecido'],
['Pinto', 'Pinheiro', 'Monteiro', 'Andrade', 'Leite', 'Correa', 'Nogueira', 'Garcia', 'de Freitas', 'Henrique'],
['Tavares', 'Coelho', 'Pires', 'de Paula', 'Correia', 'Miranda', 'de Jesus', 'Duarte', 'Freitas', 'Barros'],
['de Andrade', 'Campos', 'Santos', 'de Melo', 'da Cruz', 'Reis', 'Guimaraes', 'Moraes', 'do Carmo', 'dos Reis'],
['Viana', 'de Castro', 'Silveira', 'Moura', 'Brito', 'Neves', 'Carneiro', 'Melo', 'Medeiros', 'Cordeiro'],
['Conceição', 'Farias', 'Dantas', 'Cavalcante', 'da Rocha', 'de Assis', 'Braga', 'Cruz', 'Siqueira', 'Alves']];

var sobrenome = [['Abadia', 'Abrahao', 'Abrantes', 'Abreu', 'Acosta', 'Adriano', 'Affonso', 'Afonso', 'Agostinho', 'Agostini'],
['Aguiar', 'Aguilar', 'Aires', 'Albano', 'Alberto', 'Albino', 'Albuquerque', 'Alcantara', 'Alcântara', 'Aleixo'],
['Alencar', 'Alexandre', 'Alexandrino', 'Almeida', 'Alonso', 'Alvarenga', 'Alvares', 'Alvarez', 'Alves', 'Alves da Silva'],
['Alves de Oliveira', 'Alves de Souza', 'Alves dos Santos', 'Alves Ferreira', 'Alves Pereira', 'Alvim', 'Amador', 'Amancio', 'Amaral', 'Amarante'],
['Amaro', 'Ambrosio', 'Amorim', 'Anderson', 'Andrade', 'Andre', 'Anjos', 'Antonio', 'António', 'Antunes'],
['Anunciacao', 'Aparecida', 'Aparecido', 'Apolinario', 'Aquino', 'Aragao', 'Aranha', 'Arantes', 'Araújo', 'Araujo'],
['Arcanjo', 'Arrais', 'Arruda', 'Assis', 'Assumpcao', 'Assuncao', 'Ataide', 'Augusto', 'Avelar', 'Avelino'],
['Avila', 'Ayres', 'Azeredo', 'Azevedo', 'Bacelar', 'Bahia', 'Baia', 'Balbino', 'Balduino', 'Baltazar'],
['Bandeira', 'Baptista', 'Barata', 'Barbieri', 'Barbosa', 'Barbosa da Silva', 'Barboza', 'Barcellos', 'Barcelos', 'Barreira'],
['Barreiros', 'Barreto', 'Barros', 'Barroso', 'Basilio', 'Basso', 'Bastos', 'Batalha', 'Batista', 'Batista da Silva'],
['Bauer', 'Becker', 'Belarmino', 'Belchior', 'Bello', 'Belo', 'Benedito', 'Benevides', 'Benites', 'Bentes'],
['Bento', 'Beraldo', 'Bernardes', 'Bernardi', 'Bernardino', 'Bernardo', 'Berto', 'Beserra', 'Bessa', 'Bezerra'],
['Bianchi', 'Bianchini', 'Bicalho', 'Bispo', 'Bitencourt', 'Bittencourt', 'Blanco', 'Boaventura', 'Bomfim', 'Bonfim'],
['Borges', 'Bosco', 'Botelho', 'Braga', 'Branco', 'Brandão', 'Brandao', 'Brasil', 'Brasileiro', 'Braz'],
['Brito', 'Britto', 'Brum', 'Bruno', 'Bueno', 'Cabral', 'Caetano', 'Caires', 'Caixeta', 'Calado'],
['Caldas', 'Caldeira', 'Calixto', 'Camara', 'Camargo', 'Camargos', 'Camelo', 'Camilo', 'Campelo', 'Campos'],
['Candido', 'Cantanhede', 'Canuto', 'Cardoso', 'Cardozo', 'Carlos', 'Carmo', 'Carneiro', 'Carreiro', 'Carvalho'],
['Casagrande', 'Cassiano', 'Cassimiro', 'Castelo', 'Castelo Branco', 'Castilho', 'Castro', 'Cavalcante', 'Cavalcanti', 'Cavalheiro'],
['Celestino', 'Cerqueira', 'Cesar', 'Cezar', 'Cezario', 'Chagas', 'Chaves', 'Chavier', 'Cintra', 'Cipriano'],
['Claro', 'Claudino', 'Clemente', 'Coelho', 'Coimbra', 'Colares', 'Colombo', 'Conceição', 'Conde', 'Constantino'],
['Conte', 'Conti', 'Cordeiro', 'Corrêa', 'Correa', 'Correia', 'Cortes', 'Cortez', 'Costa', 'Coutinho'],
['Couto', 'Crisostomo', 'Crispim', 'Cristina', 'Cruz', 'Cunha', 'Cury', 'Custodio', 'Cutrim', 'da Anunciacao'],
['da Aparecida', 'da Conceicao Silva', 'da Conceiçao', 'da Costa', 'da Cruz', 'da Cunha', 'da Fonseca', 'da Gama', 'da Gloria', 'da Graca'],
['da Guia', 'da Hora', 'da Luz', 'da Mata', 'da Mota', 'da Motta', 'da Paixao', 'da Paz', 'da Penha', 'da Rocha'],
['da Rosa', 'da Silva', 'da Silveira', 'da Trindade', 'da Veiga', 'Dal', 'Dall', 'Dalla', 'Damaceno', 'Damasceno'],
['Damasio', 'Daniel', 'Dantas', 'Darc', 'Das', 'Das Chagas', 'Das Dores', 'Das Gracas', 'das Gracas Silva', 'das Merces'],
['Das Neves', 'Dasilva', 'David', 'Davila', 'De', 'de Abreu', 'de Aguiar', 'de Albuquerque', 'de Alcantara', 'de Alencar'],
['de Almeida', 'de Alvarenga', 'de Amorim', 'de Andrade', 'de Aquino', 'de Araujo', 'de Arruda', 'de Assis', 'de Assuncao', 'de Avila'],
['de Azevedo', 'de Barros', 'de Borba', 'de Brito', 'de Camargo', 'de Campos', 'de Carvalho', 'de Cassia', 'de Castro', 'de Cerqueira'],
['de Deus', 'de Faria', 'de Farias', 'de Figueiredo', 'de Franca', 'de Freitas', 'de Godoi', 'de Godoy', 'de Goes', 'de Gois'],
['de Holanda', 'de Jesus', 'de Lacerda', 'de Lara', 'de Lemos', 'de Lima', 'de Lira', 'de Lucena', 'de Luna', 'de Macedo'],
['de Magalhaes', 'de Matos', 'de Mattos', 'de Medeiros', 'de Mello', 'de Melo', 'de Mendonca', 'de Meneses', 'de Menezes', 'de Mesquita'],
['de Miranda', 'de Moraes', 'de Morais', 'de Moura', 'de Nazare', 'de Olíveira', 'de Oliveira', 'de Padua', 'de Paiva', 'de Paula'],
['de Paulo', 'de Pinho', 'de Pontes', 'de Quadros', 'de Queiroz', 'de Resende', 'de Rezende', 'de Ribamar', 'de Sales', 'de Santana'],
['de Sena', 'de Siqueira', 'de Sousa', 'de Souza', 'de Toledo', 'de Vargas', 'de Vasconcelos', 'Delfino', 'Delgado', 'Deoliveira'],
['Desouza', 'Dias', 'Dimas', 'Diniz', 'Dionizio', 'Divino', 'do Amaral', 'do Carmo', 'do Couto', 'do Espirito'],
['do Espirito Santo', 'do Livramento', 'do Nascimento', 'do Prado', 'do Rego', 'do Rocio', 'do Rosario', 'do Santos', 'do Socorro', 'do Socorro da Silva'],
['do Socorro Silva', 'do Vale', 'do Valle', 'Domingos', 'Domingues', 'Donizetti', 'Dornelas', 'Dorneles', 'Dornelles', 'dos Anjos'],
['dos Passos', 'dos Prazeres', 'dos Reis', 'dos Santos', 'Dossantos', 'Dourado', 'Drumond', 'Duarte', 'Duque', 'Duraes'],
['Dutra', 'Eduardo', 'Elias', 'Escobar', 'Espindola', 'Estevam', 'Estevao', 'Esteves', 'Estrela', 'Euzebio'],
['Evangelista', 'Fagundes', 'Falcao', 'Faria', 'Farias', 'Faustino', 'Favaro', 'Favero', 'Feijó', 'Feitosa'],
['Feitoza', 'Feliciano', 'Felicio', 'Felipe', 'Felisberto', 'Felix', 'Fereira', 'Fermino', 'Fernades', 'Fernandes'],
['Fernandez', 'Fernando', 'Ferrão', 'Ferrari', 'Ferraz', 'Ferreira', 'Ferreira da Silva', 'Ferreira de Souza', 'Ferreira dos Santos', 'Ferri'],
['Fialho', 'Fidelis', 'Figueira', 'Figueiredo', 'Figueredo', 'Filgueira', 'Filgueiras', 'Filho', 'Firmino', 'Firmo'],
['Fischer', 'Fiuza', 'Florencio', 'Flores', 'Floriano', 'Fogaca', 'Fonsêca', 'Fonseca', 'Fontana', 'Fontenele'],
['Fontes', 'Fontoura', 'Forte', 'Fortes', 'Fortunato', 'Fraga', 'Fragoso', 'Franca', 'Francelino', 'Francisco'],
['Franco', 'França', 'Frazao', 'Freire', 'Freires', 'Freitas', 'Froes', 'Frota', 'Frutuoso', 'Furlan'],
['Furtado', 'Gabriel', 'Gadelha', 'Galdino', 'Galindo', 'Gallo', 'Galvâo', 'Galvao', 'Gama', 'Garcez'],
['Garcia', 'Garrido', 'Gaspar', 'Geraldo', 'Germano', 'Gil', 'Gimenes', 'Gimenez', 'Girardi', 'Girotto'],
['Godinho', 'Godoi', 'Godoy', 'Goes', 'Gois', 'Gomes', 'Gomes da Silva', 'Gon Alves', 'Gondim', 'Gonsalves'],
['Gontijo', 'Gonzaga', 'Gonzales', 'Gonzalez', 'Gonçalves', 'Goulart', 'Gouvea', 'Gouveia', 'Grando', 'Gregorio'],
['Guedes', 'Guerra', 'Guerreiro', 'Guilherme', 'Guimarães', 'Guimaraes', 'Gurgel', 'Gusmao', 'Haddad', 'Henrique'],
['Henrique da Silva', 'Henriques', 'Hernandes', 'Hoffmann', 'Holanda', 'Honorato', 'Honorio', 'Horta', 'Inacio', 'Ito'],
['Izidoro', 'Jacinto', 'Jacob', 'Januario', 'Jaques', 'Jardim', 'Jesus', 'Joaquim', 'Jordao', 'Jorge'],
['José', 'Jose', 'Julião', 'Juliao', 'Junio', 'Junior', 'Junqueira', 'Justino', 'Klein', 'Kruger'],
['Kuhn', 'Lacerda', 'Ladeira', 'Lage', 'Lago', 'Lara', 'Laureano', 'Laurindo', 'Lazaro', 'Leal'],
['Leandro', 'Leitao', 'Leite', 'Leme', 'Lemes', 'Lemos', 'Leonardo', 'Leopoldino', 'Lessa', 'Lima'],
['Limeira', 'Linhares', 'Lino', 'Lins', 'Lira', 'Lisboa', 'Lobato', 'Lóbo', 'Loiola', 'Longo'],
['Lopes', 'Lopes da Silva', 'Lopez', 'Loureiro', 'Lourenço', 'Louzada', 'Lucas', 'Lucena', 'Luciano', 'Lucio'],
['Luís', 'Luiz', 'Luíz', 'Luna', 'Lustosa', 'Macedo', 'Macena', 'Machado', 'Maciel', 'Madeira'],
['Madureira', 'Mafra', 'Magalhaes', 'Magalhes', 'Magela', 'Magno', 'Maia', 'Malheiros', 'Malta', 'Mamede'],
['Manhaes', 'Manoel', 'Mansur', 'Mantovani', 'Maranhao', 'Marcal', 'Marcelino', 'Marchi', 'Marciano', 'Marcolino'],
['Marcon', 'Marcondes', 'Marcos', 'Maria', 'Mariano', 'Marin', 'Marinho', 'Marins', 'Marques', 'Marquês'],
['Martinelli', 'Martinez', 'Martinho', 'Martini', 'Martins', 'Mascarenhas', 'Mateus', 'Mathias', 'Matias', 'Matos'],
['Mattos', 'Mayer', 'Medeiros', 'Medina', 'Meira', 'Meireles', 'Meirelles', 'Mello', 'Melo', 'Mendes'],
['Mendonca', 'Mendonça', 'Meneses', 'Menezes', 'Mesquita', 'Messias', 'Meyer', 'Miguel', 'Milani', 'Miller'],
['Miranda', 'Modesto', 'Molina', 'Monte', 'Monteiro', 'Montenegro', 'Moraes', 'Morais', 'Morales', 'Moreira'],
['Moreno', 'Moretti', 'Morgado', 'Mori', 'Moro', 'Mota', 'Motta', 'Moura', 'Mourao', 'Muller'],
['Munhoz', 'Muniz', 'Nakamura', 'Narciso', 'Nascimento', 'Natal', 'Navarro', 'Naves', 'Nazareno', 'Negrao'],
['Negreiros', 'Nepomuceno', 'Neres', 'Neri', 'Nery', 'Neto', 'Netto', 'Neves', 'Nicolau', 'Nobre'],
['Nobrega', 'Nogueira', 'Nolasco', 'Noleto', 'Nonato', 'Noronha', 'Novaes', 'Novais', 'Nunes', 'Oliva'],
['Oliveira', 'Onofre', 'Ortega', 'Ortiz', 'Osorio', 'Pacheco', 'Padilha', 'Paes', 'Paim', 'Paiva'],
['Paixao', 'Palhares', 'Palma', 'Palmeira', 'Pantoja', 'Paranhos', 'Parente', 'Parra', 'Parreira', 'Paschoal'],
['Pascoal', 'Passos', 'Paula', 'Paulino', 'Paulo', 'Pavan', 'Pavao', 'Paz', 'Pecanha', 'Pedreira'],
['Pedro', 'Pedrosa', 'Pedroso', 'Peixoto', 'Pena', 'Penha', 'Penna', 'Penteado', 'Pereira', 'Pereira da Silva'],
['Pereira de Souza', 'Pereira dos Santos', 'Péres', 'Peres', 'Perez', 'Perin', 'Perreira', 'Pessanha', 'Pessoa', 'Pestana'],
['Petry', 'Piedade', 'Pimenta', 'Pimentel', 'Pina', 'Pinheiro', 'Pinho', 'Pinto', 'Pires', 'Piva'],
['Pompeu', 'Ponte', 'Pontes', 'Portela', 'Portella', 'Portes', 'Porto', 'Portugal', 'Prado', 'Prata'],
['Prates', 'Prazeres', 'Prestes', 'Procopio', 'Proenca', 'Prudencio', 'Prudente', 'Quadros', 'Quaresma', 'Queiros'],
['Queiroz', 'Querino', 'Quintino', 'Quirino', 'Rabello', 'Rabelo', 'Rafael', 'Raimundo', 'Ramalho', 'Ramires'],
['Ramos', 'Rangel', 'Raposo', 'Rebelo', 'Reboucas', 'Rech', 'Regina', 'Regis', 'Rego', 'Reis'],
['Resende', 'Rezende', 'Ribas', 'Ribeiro', 'Ribeiro da Silva', 'Ricardo', 'Ricci', 'Rigo', 'Rios', 'Rizzo'],
['Roberto', 'Rocha', 'Rodrigues', 'Rodriguês', 'Rodrigues da Silva', 'Rodrigues de Oliveira', 'Rodrigues de Souza', 'Rodrigues dos Santos', 'Rodriguez', 'Rolim'],
['Romano', 'Romao', 'Romeiro', 'Romero', 'Roque', 'Rosa', 'Rosas', 'Rossi', 'Ruas', 'Rufino'],
['Ruiz', 'Russo', 'Sabino', 'Sacramento', 'Saito', 'Salazar', 'Saldanha', 'Sales', 'Salgado', 'Salles'],
['Salomao', 'Salvador', 'Salviano', 'Sampaio', 'Sanches', 'Sanchez', 'Sant', 'Santana', 'Santanna', 'Santiago'],
['Santo', 'Sántos', 'Santos', 'Saraiva', 'Sardinha', 'Sarmento', 'Sartori', 'Sato', 'Savio', 'Scherer'],
['Schmidt', 'Schmitt', 'Schmitz', 'Schneider', 'Schultz', 'Seabra', 'Seixas', 'Sena', 'Senna', 'Serafim'],
['Serpa', 'Serra', 'Serrano', 'Severino', 'Severo', 'Silva', 'Silveira', 'Silverio', 'Silvestre', 'Simas'],
['Simoes', 'Simões', 'Simon', 'Siqueira', 'Soares', 'Soares da Silva', 'Sobral', 'Sobreira', 'Sobrinho', 'Sodre'],
['Sousa', 'Souto', 'Souza', 'Stein', 'Suzuki', 'Taborda', 'Takahashi', 'Tanaka', 'Targino', 'Tavares'],
['Taveira', 'Teixeira', 'Teles', 'Telles', 'Tenorio', 'Teodoro', 'Terra', 'Texeira', 'Theodoro', 'Thomaz'],
['Thome', 'Tinoco', 'Tobias', 'Toledo', 'Tolentino', 'Tomaz', 'Tome', 'Torquato', 'Torres', 'Trajano'],
['Travassos', 'Trevisan', 'Trindade', 'Uchoa', 'Urbano', 'Valadares', 'Vale', 'Valenca', 'Valente', 'Valentim'],
['Valeriano', 'Valerio', 'Valim', 'Valle', 'Valverde', 'Varela', 'Vargas', 'Vasconcellos', 'Vasconcelos', 'Vasques'],
['Vaz', 'Veiga', 'Veloso', 'Venancio', 'Ventura', 'Vera', 'Veras', 'Verissimo', 'Viana', 'Vianna'],
['Vicente', 'Vicentini', 'Vidal', 'Viegas', 'Vieira', 'Vieira da Silva', 'Viera', 'Vilar', 'Vilas', 'Vilas Boas'],
['Vilela', 'Vilhena', 'Villela', 'Vital', 'Vitor', 'Vitoriano', 'Vitorino', 'Vitorio', 'Wagner', 'Watanabe'],
['Weber', 'Xavier', 'Zimmermann', 'Borba', 'Cândido', 'Calazans', 'Bressan', 'Nicola', 'Mingazzini', 'Moscardelli'],
['Ximenes', 'Yamamoto', 'Zacarias', 'Zago', 'Zanatta', 'Zanella', 'Zanetti', 'Zanin', 'Zanini', 'Zanon']];

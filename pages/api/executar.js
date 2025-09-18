
let acaoGlobal = null;
let estadoGlobal = null;
let lastActionGlobal = null;


export default async function handler(req, res) {
    try {
        const { action } = req.query;
        console.log(`Received ${req.method} request with action: ${action}`);

        if (!action) {
            return res.status(400).json({ error: 'Action is required' });
        }

        if (req.method === 'POST') {
            const {acao,  func } = req.body;
            switch (action) {

                case 'direto':

                      if (!lastActionGlobal){
                        console.log('não há açoes')
                      if (func === 'Nivel'){
                          console.log('Executar func');
                            try{
                              acaoGlobal = "A11";
                              console.log('Setando acaoglobal para ',{acaoGlobal});
                              res.status(201).json(acaoGlobal);
                              lastActionGlobal = null;
                            } catch (error) {
                                res.status(500).json({ error: "Failed to create action" });
                              } 
                        }else if (func === 'Motor'){
                          console.log('Executar func');
                            try{
                            acaoGlobal = "A21";
                            console.log('Setando acaoglobal para',{acaoGlobal});
                              res.status(201).json(acaoGlobal);
                              lastActionGlobal = null;
                            } catch (error) {
                                res.status(500).json({ error: "Failed to create action" });
                              } 
                        }else{
                          console.log('Ação incorreta');
                          res.status(201).json(acaoGlobal);
                        };
                      }else{
                        console.log('executando ainda');
                        res.status(201).json(acaoGlobal);
                      }

                      if(acao === "A60"){
                        acaoGlobal = "A60";
                        setTimeout(() => {
                          acaoGlobal = null;
                          console.log('Variável global estadoGlobal configurada para null após 2 minutos.');
                          }, 20 * 1000); // 2 minutos em milissegundos
                      }


                        break;
                default:
                    res.status(400).json({ error: 'Invalid action for POST request.' });
            }
        } else if (req.method === 'GET') {
            switch (action) {
                case 'acao':
                    console.log('Acao enviada ao get', acaoGlobal);
                    res.status(200).json(acaoGlobal);
                    break;
                case 'estado':
                    console.log('Estado enviado ao get', estadoGlobal);
                    res.status(200).json(estadoGlobal);
                    break;
                default:
                    res.status(400).json({ error: 'Invalid action for GET request.' });
            }
        } else {
          res.setHeader('Allow', ['POST', 'GET']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

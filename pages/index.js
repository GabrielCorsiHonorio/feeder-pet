import { useState} from 'react';
import styles from '../styles/controle.module.css';


const Index = () => {

        const [isDisabled, setIsDisabled] = useState(false);

        const handleMotor = async () => {

            const response = await fetch('/api/executar?action=direto', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({  func:'Motor' }),
            });
        
            if (!response.ok) {
                const data = await response.json();
                alert(data.error || 'Erro ao registrar a ação');
                // throw new Error('Erro ao registrar a ação');
            }
            //   const data = await response.json();
            //   console.log('o valor da ação retornada é',data.action)
            console.log('Estado registrado com sucesso');
            setIsDisabled(true);
            setTimeout(() => {
                setIsDisabled(false);
            }, 20000);

      };

        const handleNivel = async () => {

            const response = await fetch('/api/executar?action=direto', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ func:'Nivel' }),
            });

            
        
            if (!response.ok) {
                const data = await response.json();
                alert(data.error || 'Erro ao registrar a ação');
                // throw new Error('Erro ao registrar a ação');
            }

            const data = await response.json();
            console.log(data)
            console.log('Estado registrado com sucesso');
            setIsDisabled(true);
            setTimeout(() => {
                setIsDisabled(false);
            }, 20000);

      };

        const handleCarta = async () => {

            const response = await fetch('/api/executar?action=direto', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acao:'A60' }),
            });

            
        
            if (!response.ok) {
                const data = await response.json();
                alert(data.error || 'Erro ao registrar a ação');
                // throw new Error('Erro ao registrar a ação');
            }

            const data = await response.json();
            console.log(data)
            console.log('Estado registrado com sucesso');
            setIsDisabled(true);
            setTimeout(() => {
                setIsDisabled(false);
            }, 20000);

      };



      return (


        <div className={styles.pageContainer}>
                    <h1 className={styles.title}>Comandos</h1>
                    <div className={styles.buttonsContainer}>
                        <button  className={styles.button} onClick={() => handleMotor()} disabled={isDisabled}>Motor</button>
                        <button  className={styles.button} onClick={() => handleNivel()} disabled={isDisabled}>Nivel</button>
                    </div>
        </div>
      );
};

export default Index;



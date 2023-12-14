class Excecao {

    tratarExcecao() {
        cy.on("uncaught:exception", (e, runnable) => {
            console.log("error", e);
            console.log("runnable", runnable);
            return false;
        });
    }
}

export default new Excecao();
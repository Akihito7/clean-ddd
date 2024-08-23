/* Pattern watched list - basicamente como o nome sugere é uma lista "assistida", "observada"
diferente de array tradicionais, com esse pattern podemos ter maior controle sobre os nossos itens 
se algum foi adicionado, se foi, qual é o item e mesmo para o delete, update, vamos usar isso pra que?

basicamente imagina que voce tem os itens [1,2,3] no seu banco mas essa informação foi atualizada e agora o front end mandou [1,2,3,4]
sera que nos precisamos simplesmente atualizar todos os itens do banco de dados? ou apenas colocar o item 4 na lista que ja existe?
sem isso nos apenas colocaria todos os itens no banco usando um update tradicional passando [1,2,3,4] 
*/

export abstract class WatchedList<T> {

  public currentItems: T[]
  private initial: T[]
  private new: T[]
  private removed: T[]

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems || []
    this.initial = initialItems || []
    this.new = []
    this.removed = []
  }

  abstract compareItems(a: T, b: T): boolean

  public getItems(): T[] {
    return this.currentItems
  }

  public getNewItems(): T[] {
    return this.new
  }

  public getRemovedItems(): T[] {
    return this.removed
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length !==
      0
    )
  }

  private isNewItem(item: T): boolean {
    return this.new.filter((v: T) => this.compareItems(item, v)).length !== 0
  }

  private isRemovedItem(item: T): boolean {
    return (
      this.removed.filter((v: T) => this.compareItems(item, v)).length !== 0
    )
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter((v) => !this.compareItems(v, item))
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v),
    )
  }

  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v))
  }

  private wasAddedInitially(item: T): boolean {
    return (
      this.initial.filter((v: T) => this.compareItems(item, v)).length !== 0
    )
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item)
  }

  public add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item)
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item)
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item)
    }
  }

  public remove(item: T): void {
    this.removeFromCurrent(item)

    if (this.isNewItem(item)) {
      this.removeFromNew(item)

      return
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item)
    }
  }

  public update(items: T[]): void {
    const newItems = items.filter((a) => {
      return !this.getItems().some((b) => this.compareItems(a, b))
    })

    const removedItems = this.getItems().filter((a) => {
      return !items.some((b) => this.compareItems(a, b))
    })

    this.currentItems = items
    this.new = newItems
    this.removed = removedItems
  }
}


/* 
Watched list by chatgpt 


Explicação do Padrão Watched List
A ideia principal por trás do padrão "watched list" é fornecer um mecanismo para rastrear e reagir às mudanças em uma lista de itens de forma eficiente. Vamos detalhar alguns conceitos e objetivos para solidificar o entendimento:

Controle Detalhado sobre Mudanças:

Adições: O padrão permite identificar quais itens foram adicionados à lista.
Remoções: Facilita a identificação de itens que foram removidos da lista.
Alterações: Ajuda a atualizar ou modificar a lista conforme necessário, sem substituir completamente os itens existentes.
Eficiência na Atualização de Dados:

Minimização de Operações de Banco de Dados: Em vez de atualizar todos os itens em um banco de dados, você pode adicionar ou remover apenas os itens que mudaram. Isso reduz a carga no banco de dados e melhora a eficiência da aplicação.
Granularidade: Ao saber exatamente o que mudou, você pode realizar operações mais específicas e eficientes. Por exemplo, se um item é adicionado, você pode executar apenas uma operação de inserção para esse item específico.
Exemplo Prático:

Suponha que você tenha uma lista de itens [1, 2, 3] no banco de dados e o frontend envia uma lista atualizada [1, 2, 3, 4].
Sem o padrão watched list, você pode atualizar toda a lista no banco, substituindo os itens existentes.
Com o padrão watched list, você pode identificar que o item 4 foi adicionado e executar apenas uma operação de inserção para esse item, mantendo os itens 1, 2, 3 inalterados no banco.
*/
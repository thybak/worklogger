export class CacheApp<T> {
    entradas: Map<number, T[]> = new Map<number, T[]>();
    obtener(usuarioId: number) {
        return this.entradas.get(usuarioId);
    }
    eliminar(usuarioId: number){
        this.entradas.delete(usuarioId);
    }
    introducir(usuarioId: number, entradas: T[]){
        this.entradas.set(usuarioId, entradas);
    }
    tieneEntradas(usuarioId: number){
        return this.entradas.get(usuarioId) !== undefined;
    }
}
import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: string;
}

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAddProduct = (event: FormEvent) => {
    event.preventDefault();
    const id = products.length + 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({ name: "", price: "" });
    toast("Cadastrado com sucesso!");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="p-6 max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Produtos</h1>
          <div className="flex items-center justify-between">
            <form className="flex items-center w-80">
              <Input
                name="search"
                placeholder="Nome do produto"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="w-4 h-3 mr-2" /> Novo produto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo produto</DialogTitle>
                  <DialogDescription>
                    Criar um novo produto no sistema
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-6 items-center text-right gap-2">
                    <Label htmlFor="name">Produto</Label>
                    <Input
                      className="col-span-3"
                      id="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-6 items-center text-right gap-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      className="col-span-3"
                      id="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="border rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableHead>ID</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Preço</TableHead>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>R$ {product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

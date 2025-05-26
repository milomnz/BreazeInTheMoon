/* eslint-disable prettier/prettier */
// usuario.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repo: Repository<Usuario>;

  const mockUsuario = {
    id: 1,
    nombre: 'Juan',
    correo: 'juan@example.com',
    contrasena: 'hashedPassword',
    rol: 'cliente',
    save: jest.fn(),
  };

  const usuarioRepoMock = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockUsuario),
    find: jest.fn().mockResolvedValue([mockUsuario]),
    findOneBy: jest.fn().mockResolvedValue(mockUsuario),
    update: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: usuarioRepoMock,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repo = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('debería crear un usuario con contraseña encriptada', async () => {
    const dto = {
      nombre: 'Juan',
      correo: 'juan@example.com',
      contrasena: '123456',
      rol: 'cliente',
    };

    const hashedPassword = await bcrypt.hash(dto.contrasena, 10);
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);

    const resultado = await service.create(dto as any);

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({ contrasena: hashedPassword }));
    expect(resultado).toEqual(mockUsuario);
  });

  it('debería retornar todos los usuarios', async () => {
    const resultado = await service.findAll();
    expect(resultado).toEqual([mockUsuario]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('debería retornar un usuario por ID', async () => {
    const resultado = await service.findOne(1);
    expect(resultado).toEqual(mockUsuario);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('debería actualizar un usuario', async () => {
    await service.update(1, { nombre: 'Juan Actualizado' } as any);
    expect(repo.update).toHaveBeenCalledWith(1, { nombre: 'Juan Actualizado' });
  });

  it('debería eliminar un usuario', async () => {
    await service.remove(1);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(repo.remove).toHaveBeenCalledWith(mockUsuario);
  });
});

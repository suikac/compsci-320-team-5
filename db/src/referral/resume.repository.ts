import { EntityRepository, Repository } from 'typeorm';
import { Resume } from '../entities/Resume';

@EntityRepository(Resume)
export class ResumeRepository extends Repository<Resume> {

}

import { EntityRepository, Repository } from "typeorm";
import { Referral } from "../entities/Referral";

@EntityRepository(Referral)
export class ReferralRepository extends Repository<Referral> {

}

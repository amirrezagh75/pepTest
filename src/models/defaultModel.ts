import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class DefaultType {
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    private created_at?: Date; // Creation date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @Exclude()
    private updated_at?: Date; // Last updated date

}
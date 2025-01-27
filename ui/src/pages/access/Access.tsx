import { AccessEdit } from "@/components/certimate/AccessEdit";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Access as AccessType, accessTypeMap } from "@/domain/access";
import { convertZulu2Beijing } from "@/lib/time";
import { useConfig } from "@/providers/config";
import { remove } from "@/repository/access";
import { Key } from "lucide-react";

const Access = () => {
  const { config, deleteAccess } = useConfig();
  const { accesses } = config;

  const handleDelete = async (data: AccessType) => {
    const rs = await remove(data);
    deleteAccess(rs.id);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">授权管理</div>
        <AccessEdit trigger={<Button>添加授权</Button>} op="add" />
      </div>
      {accesses.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <span className="bg-orange-100 p-5 rounded-full">
            <Key size={40} className="text-primary" />
          </span>

          <div className="text-center text-sm text-muted-foreground mt-3">
            请添加授权开始部署证书吧。
          </div>
          <AccessEdit
            trigger={<Button>添加授权</Button>}
            op="add"
            className="mt-3"
          />
        </div>
      ) : (
        <>
          <div className="hidden sm:flex sm:flex-row text-muted-foreground text-sm border-b sm:p-2 mt-5">
            <div className="w-48">名称</div>
            <div className="w-48">服务商</div>

            <div className="w-52">创建时间</div>
            <div className="w-52">更新时间</div>
            <div className="grow">操作</div>
          </div>
          <div className="sm:hidden flex text-sm text-muted-foreground">
            授权列表
          </div>
          {accesses.map((access) => (
            <div
              className="flex flex-col sm:flex-row text-secondary-foreground border-b sm:p-2 hover:bg-muted/50 text-sm"
              key={access.id}
            >
              <div className="sm:w-48 w-full pt-1 sm:pt-0 flex items-center">
                {access.name}
              </div>
              <div className="sm:w-48 w-full pt-1 sm:pt-0 flex  items-center space-x-2">
                <img
                  src={accessTypeMap.get(access.configType)?.[1]}
                  className="w-6"
                />
                <div>{accessTypeMap.get(access.configType)?.[0]}</div>
              </div>

              <div className="sm:w-52 w-full pt-1 sm:pt-0 flex items-center">
                创建于 {access.created && convertZulu2Beijing(access.created)}
              </div>
              <div className="sm:w-52 w-full pt-1 sm:pt-0 flex items-center">
                更新于 {access.updated && convertZulu2Beijing(access.updated)}
              </div>
              <div className="flex items-center grow justify-start pt-1 sm:pt-0">
                <AccessEdit
                  trigger={
                    <Button variant={"link"} className="p-0">
                      编辑
                    </Button>
                  }
                  op="edit"
                  data={access}
                />
                <Separator orientation="vertical" className="h-4 mx-2" />
                <Button
                  variant={"link"}
                  className="p-0"
                  onClick={() => {
                    handleDelete(access);
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Access;

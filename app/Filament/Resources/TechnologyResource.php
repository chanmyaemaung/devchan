<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TechnologyResource\Pages;
use App\Filament\Resources\TechnologyResource\RelationManagers;
use App\Models\Technology;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TechnologyResource extends Resource
{
    protected static ?string $model = Technology::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?string $navigationGroup = 'Portfolio';
    protected static ?string $navigationLabel = 'Technologies';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Programming Language Details')
                    ->description('Enter the details of the programming language.')
                    ->collapsible()
                    ->schema([
                        Group::make([
                            Select::make('tech_stack_id')
                                ->relationship('techStack', 'name')
                                ->label(__('Tech Stack')),
                            TextInput::make('name')
                                ->label(__('Name'))
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->placeholder(__('Enter technology name')),
                            TextInput::make('url')
                                ->label(__('URL'))
                                ->placeholder('https://example.com'),
                        ])->columns(3),

                        FileUpload::make('icon')
                            ->disk('public')
                            ->directory('technologies')
                            ->label(__('Icon Image'))
                            ->placeholder('Upload icon image')
                            ->columnSpanFull()
                            ->acceptedFileTypes(['image/*'])
                            ->columnSpanFull(),
                    ])
                    ->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('techStack.name')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('name')
                    ->searchable(),
                ImageColumn::make('icon')
                    ->disk('public')
                    ->size(40),
                TextColumn::make('url')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTechnologies::route('/'),
            'create' => Pages\CreateTechnology::route('/create'),
            'edit' => Pages\EditTechnology::route('/{record}/edit'),
        ];
    }
}
